const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ tokens: [], users: [], logs: []})
  .write()

function addUser(_params) {
	db.get('users')
	  .push(_params)
	  .write()
}
function getUser(_id) {
	return db.get('users')
	  .find({ id: _id })
	  .value()
}
function deleteUser(_id)
{
	db.get('users')
	  .remove({ id: _id })
	  .write()

}
function addToken(_params) {
	db.get('tokens')
	  .push(_params)
	  .write()
}
function getToken(_id) {
	return db.get('tokens')
	  .find({ id: _id })
	  .value()
}
function deleteToken(_id)
{
	db.get('tokens')
	  .remove({ id: _id })
	  .write()
}
function log(_params)
{
	db.get('logs')
	  .push(_params)
	  .write()
}
module.exports = {
	addUser,
	getUser,
	deleteUser,
	addToken,
	getToken,
	deleteToken,
	log
}