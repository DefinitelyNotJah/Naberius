const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
var colors = require('colors');
const config = require('./config.json')
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");

["command", "event"].forEach(handler=> {

  require(`./handlers/${handler}`)(client);


});

( async () => {
try {
  	client.login(config.discord_token)
  }
  catch ( err )
  {
  	console.log(colors.red(err));
  }
})();
