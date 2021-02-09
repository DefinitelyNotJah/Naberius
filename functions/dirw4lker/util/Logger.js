const logWelcome = require('../util/welcome')();

/**
 *
 * @param debugFlag
 * @returns {Logger}
 * @constructor
 */
function Logger(debugFlag) {
    const thisInstance = this;

    thisInstance.clearLine = function clearLine() {
        if (debugFlag) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
        }
    };

    thisInstance.clearAndLog = function clearAndLog(arg) {
        if (debugFlag) {
            thisInstance.clearLine();
            thisInstance.log(...arguments);
        }
    };

    thisInstance.log = function log(arg) {
        if (debugFlag) {
            console.log(...arguments);
        }
    };

    thisInstance.overwriteLastLine = function overwriteLastLine(arg) {
        if (debugFlag) {
            thisInstance.clearLine();
            thisInstance.write(arg);
        }
    };

    thisInstance.send = function send(arg) {
        process.send(arg);
    };

    thisInstance.table = function table(arg) {
        if (debugFlag) {
            console.table(arg);
        }
    };

    thisInstance.welcome = function () {
        thisInstance.log(logWelcome);
    };

    thisInstance.write = function write(arg) {
        if (debugFlag) {
            process.stdout.write(arg);
        }
    };

    return thisInstance;
}

module.exports = Logger;