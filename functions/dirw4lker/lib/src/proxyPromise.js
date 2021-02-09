const net = require('net');

/**
 * Make request to an http-proxy and dump response back.
 * @param {{PORT: Number, pAddress: String, host: String, PAYLOAD: String[], maxChunks: Number, timeout: Number, injectPayload: Boolean}} config
 * @param {String} config.pAddress - The proxy-address.
 * @param {Number} config.port - Destination port of used proxy.
 * @param {String} config.targetHost - The receiver IP-Address/hostname.
 * @param {Number} config.targetPort - Destination port.
 * @param {String[]} config.PAYLOAD - The payload to inject on tcp-connection established.
 * @param {Number} [config.maxChunks] - Maximal number of chunks to receive before destroying connection. As Default 2.
 * @param {Number} [config.timeout] - TTL for socket in ms. As Default 5000.
 * @returns {Promise<String>} - The received response.
 */
function proxyPromise(config) {
    let {target, targetHost, targetPort, PROXY_ADDRESS, PORT: port, PAYLOAD, maxChunks, timeout, injectPayload, isTargetHttps} = config;
    //setting default params
    maxChunks = maxChunks || 2;
    timeout = timeout || 5000;
    injectPayload = (!injectPayload && injectPayload !== false) ? true : injectPayload;

    return new Promise(function (resolve, reject) {
        const client = new net.Socket();
        let response = '';
        let chunksCounter = 0;

        client.connect(port, PROXY_ADDRESS, function onConnectionOpen() {
            if (injectPayload && PAYLOAD[0]) {
                client.write(PAYLOAD[0]); //injecting connect payload
            }
        });

        client.on('data', function (data) {
            chunksCounter++;
            if (chunksCounter > 1) { // dont need to append proxy response... this will be 200 at first
                response += data.toString();
            }

            //destroying socket after certain number of received chunks
            if (chunksCounter === maxChunks) {
                client.destroy();
            }
            if (chunksCounter === 1 && injectPayload && PAYLOAD[1]) {
                if (isTargetHttps) {
                    const tlsPromise = require('./tlsPromise');
                    return tlsPromise({
                        socket: client,
                        ADDRESS: target,
                        host: targetHost,
                        PORT: targetPort,
                        PAYLOAD: PAYLOAD[1],
                        injectPayload,
                        maxChunks
                    })
                        .then(function (responseFromTls) {
                            resolve(responseFromTls); //resolve here response from https-request
                        });
                } else {
                    client.write(PAYLOAD[1]);
                }
            }
        });

        //initialize event handling to promisify
        client.on('error', function (err) {
            client.destroy(); // killing client
            reject(err);
        });

        // only if request goes not to https...resolve on closed connection
        if (!isTargetHttps) {
            client.on('close', function () {
                resolve(response);
            });
        }

        client.on('end', function () {
            client.destroy(); // killing client
            resolve(response);
        });

        client.on('timeout', function () {
            client.destroy(); // killing client
            resolve(response);
        });

        client.setTimeout(timeout);
    });
}

module.exports = proxyPromise;