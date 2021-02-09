const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const Logger = require('./util/Logger');
const startDicAttack = require('./lib/startDicAttack');

/**
 * Launch dictionary-attack to the target host.
 * @param {Object} config
 * @param {string} config.host - The receiver hostname. (Ex: http://example.com)
 * @param {string} [config.listDir] - The path to the dictionary-file.
 * @param {Array<string>} [config.list] - Array of strings to use.
 * @param {boolean} [config.appendSlashAfter] - Append `/` character on first loop. Default as true.
 * @param {string|Array} [config.ext] - The extra extensions name to combine with the hostname. (EX: 'php,txt' or '.php,.txt', or ["php",...])
 * @param {string} [config.dns] - The used dns to resolve hostname.
 * @param {string} [config.proxy] - The used proxy. The form must be the follow (Ex: http://proxyIp:proxyPort).
 * @param {string} [config.ignoreResponseWith] - The string to ignore on response received. If response contains given parameter, then will be ignored.
 * @param {boolean} [config.verbose] - Activate verbose. As default false.
 * @param {boolean} [config.asyncRequests] - Starting attack in async way. As default false.
 * @param {Number} [config.maxConcurrency] - The maximal number of sent parallel asynchronous requests (only if asyncRequests is true). As default 100.
 * @returns {Promise<Object>} - The found results. {sent:<Number>, founds:[{target:<host:port/foundPage>, response:<string>, ms:<Number>}, ...]}
 */
async function launch(config = {}) {
    const DEFAULT_EXTENSIONS = (typeof config.appendSlashAfter === 'boolean' && config.appendSlashAfter === false) ? [''] : ['/']; //defining default extensions to use
    const logger = new Logger(config.verbose);
    delete config.verbose; //delete verbose attribute 'cause is only need to init Logger-Instance

    logger.welcome();
    logger.table(config);

    config.dns = config.dns ? config.dns.split(',') : false;
    if (config.maxConcurrency) {
        config.maxConcurrency = parseInt(config.maxConcurrency) ? parseInt(config.maxConcurrency) : undefined;
    }
    if (!config.host) {
        throw new Error('host parameter is not used or empty. Ex: --host=http://example.com');
    }
    if (!config.listDir && !config.list) {
        logger.log('\n--listDir parameter is not used or empty. Using default list will not be really effective!');
        config.listDir = __dirname + '/lib/lists/global.txt';
    }
    if (config.ext) {
        config.ext = ((typeof config.ext === 'string') ? config.ext.split(',') : config.ext)
            .map(function (ext) {
                ext = (ext[0] !== '.') ? '.' + ext : ext;
                return ext;
            });
    }

    config.ext = [...DEFAULT_EXTENSIONS, ...(config.ext || [])];

    let cleanedData;
    if (!config.list || !(config.list instanceof Array)) {
        const data = await readFile(config.listDir);
        //cleaning data from #comments or empty strings
        cleanedData = data.toString()
            .split('\n')
            .filter(function (string) {
                return string && string[0] !== '#';
            });
    } else {
        cleanedData = config.list;
    }

    logger.log('\n');
    const results = await startDicAttack({
        list: cleanedData,
        extensions: config.ext,
        target: config.host,
        dns: config.dns,
        proxy: config.proxy,
        logger,
        timeout: config.timeout,
        ignoreResponseWith: config.ignoreResponseWith
    }, config.asyncRequests, config.maxConcurrency);

    logger.clearLine();
    //cleaning from errored
    const filtered = results
        .filter(function (response) {
            return response && !response.err;
        });

    return {sent: results.length, founds: filtered};
}

module.exports = {launch};