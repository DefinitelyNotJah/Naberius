const RequestAgent = require('./RequestAgent');

/**
 * Make request and filter response.
 * @param {object} config -
 * @param {string} config.target - target host.
 * @param {string} config.path - target path.
 * @param {string[]} [config.dns] - used dns list.
 * @param {function} [config.onResponse] - onFound-Event.
 * @returns {Promise<String | boolean>}
 */
function makeAndLogReq(config) {
    const {ignoreResponseWith, onResponse, path} = config;
    const slashed = (config.target[config.target.length - 1] === '/') ? '' : '/';
    const target = config.target + slashed + path;
    config.target = target;

    const timerStart = new Date();
    return RequestAgent(config)
        .then(function filterResponse(responseString) {
            if (!responseString) {
                throw new Error('No response received.')
            }
            const time = new Date() - timerStart;
            const resultStats = {target: target, res: responseString, ms: time};
            if (~responseString.indexOf('404') || (ignoreResponseWith && ~responseString.indexOf(ignoreResponseWith))) {
                resultStats.err = true;
            }
            if (onResponse && typeof onResponse === 'function') {
                onResponse(undefined, resultStats);
            }
            return resultStats;
        })
        .catch(function (err) {
            const time = new Date() - timerStart;
            const erroredResult = {target: target, ms: time, err: err};
            if (onResponse && typeof onResponse === 'function') {
                onResponse(erroredResult, undefined)
            }
            return erroredResult;
        });
}

module.exports = makeAndLogReq;