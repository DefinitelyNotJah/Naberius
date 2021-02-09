function parseArg(argumentsArray) {
    const argObj = {};
    for (let arg of argumentsArray) {
        const [attr, value] = arg.split('=');
        const attribute = attr.replace(/-/gmi, '');

        if (value && (value.toLowerCase() === 'false' || value === '0')) {
            argObj[attribute] = false;
        } else {
            argObj[attribute] = (value && value !== 'true') ? value : true;
        }
    }
    return argObj;
}

module.exports = parseArg;