const makeAndLogReq = require('./makeAndLogReq');
const parallelPromises = require('../util/parallelPromises');

/**
 * Start dictionary attack with given list.
 * @param {Object} options - The object options
 * @param {string} options.target - target host.
 * @param {string[]} options.list - The list of string to use.
 * @param {string[]} options.extensions - The list of extensions to combine.
 * @param {string[]} [options.dns] - The list of dns to use.
 * @param {string} [options.proxy] - The used proxy. The form must be the follow (Ex: http://proxyIp:proxyPort).
 * @param {string} [options.ignoreResponseWith] - The string to ignore on response received. If response contains given parameter, then will be ignored.
 * @param {Logger} options.logger - logger instance.
 * @param {boolean} [asyncRequests] - Starting attack in async way. As Default false
 * @param {Number} [maxConcurrency] - The maximal number of sent parallel asynchronous requests. As default 100.
 * @returns {Promise<Array>}
 */
async function startDicAttack(options, asyncRequests = false, maxConcurrency = 100) {
    const ResponseEvent = new (require('./onResponseEvent'))(); //initializing Response-Class to manage sent requests etc.
    const {list, extensions, target, dns, proxy, logger, timeout, ignoreResponseWith} = options;
    const listLen = list.length * extensions.length;
    const listArguments = [];
    let results = [];
    for (let string of list) {
        for (let ext of extensions) {
            const targetPath = string + ext;
            const requestOptions = {
                target,
                path: targetPath,
                dns, ignoreResponseWith,
                proxy: proxy,
                timeout: timeout,
                onResponse: function (err, res) {
                    ResponseEvent.onResponse(err, res, {targetPath, listLen, logger});
                }
            };
            if (!asyncRequests) {
                results.push(await makeAndLogReq(requestOptions)); // make request in a sync-way
            } else {
                listArguments.push(requestOptions); //else push option object to map async calls later
            }
        }
    }
    if (asyncRequests) {
        return await parallelPromises(listArguments, makeAndLogReq, maxConcurrency);
    } else {
        return results;
    }
}

module.exports = startDicAttack;