const exec = require('ssh-exec')
const serverList = require('../ddos.json')

let arr = serverList.servers
let res = []
var timeserv
var endserv
var startserv
module.exports = (command) => {
	return new Promise( (resolve, reject) => {
	    var index = 0;

	    function next () {
	        if (!arr.length) {
	            reject(res)
	            return
	        }

	        if (index >= arr.length) {
	            resolve(res)
	            return
	        }

	        startserv = new Date().getTime();
            exec(command, {
				user: arr[index].user,
				host: arr[index].host,
				password: arr[index].password,
			}, (err, stdout, stderr) => {
				endserv = new Date().getTime();
				timeserv = endserv - startserv;
				if(err) {
					res.push({
						index : index,
						success : false,
						error : err,
						time : timeserv
					})
				} else {
					res.push({
						index : index,
						success : true,
						error : '',
						time : timeserv
					})
				}
				++index;
	            next()
			})
	    }

	    next();
	})
}