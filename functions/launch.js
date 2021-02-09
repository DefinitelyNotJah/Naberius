const axios = require('axios')
const serverList = require('../ddos.json')

let arr = serverList.servers
let res = []
var timeserv
var endserv
var startserv
module.exports = (_params) => {
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
	        axios.get(arr[index].link, {
	        	params : _params
	        }).then( (res) => {
	        	endserv = new Date().getTime();
				timeserv = endserv - startserv;
				res.push({
					index : index,
					server : arr[index].link,
					success : true,
					error : '',
					code : res.success,
					msg : res.message,
					time : timeserv
				})
				++index;
	            next()
	        }).catch( (err) => {
	        	endserv = new Date().getTime();
				timeserv = endserv - startserv;
				res.push({
					index : index,
					server : arr[index].link,
					success : false,
					error : err.message,
					code : res.success,
					msg : res.message,
					time : timeserv
				})
				++index;
	            next()
	        })
	    }

	    next();
	})
}