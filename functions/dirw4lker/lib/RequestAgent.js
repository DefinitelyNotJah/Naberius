const Url = require('url');

const makeRequest = require('./makeRequest');
const dnsResolver = require('./src/dnsResolverPromise');

function isHttps(protocol) {
    return protocol && protocol === 'https:'
}

/**
 * HTTP(s)-Client.
 * @param {object} config
 * @param {String} config.target - The receiver hostname.
 * @param {String[]} [config.dns] - The list of dns to use. As default localhost.
 * @param {Boolean} [config.injectPayload] - Inject http-get payload or not.
 * @param {string} [config.proxy] - The used proxy. (Ex: http://proxyIp:proxyPort)
 * @returns {Promise<String>}
 */
async function RequestAgent(config) {
    let {target, dns, injectPayload, proxy} = config;

    const url = Url.parse(target); //parsing url
    const port = url.port || (isHttps(url.protocol) ? 443 : 80); //setting default port if not exist on given target

    //if proxy is set, then dont need to resolve address self.
    const addresses = (!proxy && dns) ? await dnsResolver(url.hostname, dns) : [];

    //parsing proxy stats
    const proxyStats = (proxy) ? Url.parse(proxy) : undefined;
    const proxyAddress = (proxyStats) ? proxyStats.hostname : undefined;
    const proxyPort = (proxyStats) ? proxyStats.port : undefined;

    const reqOptions = {
        address: addresses[0] || url.hostname, //getting first resolved ip-address
        host: url.hostname,
        port: parseInt(port),
        path: url.path,
        injectPayload,
        isHttps: isHttps(url.protocol),
        proxy: proxyAddress,
        timeout: config.timeout,
        proxyPort: proxyPort,
        isTargetHttps: isHttps(url.protocol),
        maxChunks: 2
    };

    return makeRequest(reqOptions)
        // TODO use this for debugging
        // .then(function (rs) {
        //     console.log('###', rs);
        //     return rs
        // });
}


module.exports = RequestAgent;