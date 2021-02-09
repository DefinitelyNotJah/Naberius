const MAX_ERRORS = 25;
const ERROR_STRING = 'System has recognized more than ' + MAX_ERRORS + ' errors! Closing process...';

/**
 *
 * @returns {exports}
 */
module.exports = function onResponseEvent() {
    const thisInstance = this;

    const REQUESTS_STATS = {
        counter: 0,
        min: null,
        max: null,
        midRange: null,
        founds: 0,
        errors: 0
    };

    thisInstance.onResponse = function (erroredResult, foundResult, options) {
        const {targetPath, listLen, logger} = options;
        const {target, ms, res, err} = foundResult || erroredResult;
        if (REQUESTS_STATS.counter % 10) {
            REQUESTS_STATS.min = (ms <= REQUESTS_STATS.min) ? ms : REQUESTS_STATS.min;
            REQUESTS_STATS.max = (ms > REQUESTS_STATS.max) ? ms : REQUESTS_STATS.max;
        } else {
            REQUESTS_STATS.midRange = (REQUESTS_STATS.min + REQUESTS_STATS.max) / 2;
        }
        REQUESTS_STATS.counter++;

        const percent = REQUESTS_STATS.counter / listLen * 100;
        logger.overwriteLastLine(percent.toFixed(0) + '%'
            + '\t' + REQUESTS_STATS.counter + '/' + listLen
            + '\t' + 'ETA: ' + Math.ceil((REQUESTS_STATS.midRange * (listLen - REQUESTS_STATS.counter)) / 1000) + 's'
            + '\t' + targetPath);

        if (err) {
            if (err.code) {
                REQUESTS_STATS.errors++;
                logger.clearAndLog(
                    [new Date()],
                    (err.code),
                    '@@at', target,
                    'after', ms, 'ms');
            }
            if (REQUESTS_STATS.errors >= MAX_ERRORS) {
                throw new Error(ERROR_STRING);
            }
            return;
        }

        const CODE = res.split('\r\n')[0];
        logger.clearAndLog(
            '(' + ++REQUESTS_STATS.founds + ')',
            [new Date()],
            target, '=>', CODE);
    };

    return thisInstance;
};