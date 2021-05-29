const configuration = require('../ddos.json')
const _ = require('lodash');

function findValue(arr,value) {
  return _.filter(arr, function (object) {
    return object['name'].toLowerCase().indexOf(value.toLowerCase()) >= 0;
  });
}
function getPayload(_params) {
	let methodPayload = findValue(configuration.methods, _params.method)
	methodPayload = methodPayload[0]
	if(methodPayload) {
		methodPayload.command = methodPayload.command.replace('%1target1%', _params.target)
		methodPayload.command = methodPayload.command.replace('%1port1%', _params.port)
		methodPayload.command = methodPayload.command.replace('%1duration1%', _params.duration)
		return methodPayload.command
	}
	return false
}
module.exports = {
	getPayload
}