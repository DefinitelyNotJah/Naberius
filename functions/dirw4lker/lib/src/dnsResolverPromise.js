const {Resolver} = require('dns');

/**
 * Resolve
 * @param {String} hostname
 * @param {Array<String>} dns
 * @returns {Promise<Array<String>>} - The resolved IP-Addresses.
 */
function resolverPromise(hostname, dns) {
    return new Promise(function (resolve, reject) {
        const resolver = new Resolver();

        //setting dns servers if needed
        if (dns && dns.length) {
            resolver.setServers(dns);
        }
        resolver.resolve(hostname, function onResolvedHostName(err, addresses) {
            if (err) {
                reject(err);
            }
            resolve(addresses);
        });
    })
}

module.exports = resolverPromise;