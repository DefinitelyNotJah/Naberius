const tcpPromise = require('./src/tcpPromise');
const tlsPromise = require('./src/tlsPromise');
const proxyPromise = require('./src/proxyPromise');
const getPayLoad = require('./getPayload');

function makeRequest(config) {
    let {address, host, port, path, isHttps, injectPayload, maxChunks, proxy, timeout, proxyPort, isTargetHttps} = config;
    const Payload = getPayLoad(path, host, port);

    if (proxy && proxy.length) {
        // make request through proxy TODO implement Proxy-Authorization with credentials
        const payloads = [Payload.connect, Payload.get];// connect request and get
        return proxyPromise({
            PROXY_ADDRESS: proxy,
            PORT: proxyPort,
            target: address,
            targetHost: host,
            targetPort: port,
            timeout: timeout,
            PAYLOAD: payloads,
            isTargetHttps,
            injectPayload,
            maxChunks
        });
    }
    const payload = Payload.get;
    if (isHttps) {
        return tlsPromise({ADDRESS: address, host: host, PORT: port, PAYLOAD: payload, injectPayload, maxChunks, timeout: timeout});
    } else {
        return tcpPromise({ADDRESS: address, PORT: port, PAYLOAD: payload, injectPayload, maxChunks, timeout: timeout});
    }
}

module.exports = makeRequest;