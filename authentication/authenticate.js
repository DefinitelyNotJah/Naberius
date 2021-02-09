const Discord = require("discord.js");
const { getUser } = require('../functions/dbutils')

module.exports = (message) =>  {
	return new Promise( async (resolve, reject) => {
		const isavailable = getUser(message.author.id)
		if(!isavailable)
		{
	      const unsuccessfulembed = new Discord.MessageEmbed()
	        .setTitle(`This command is for premium members only.`)
	        .setDescription(`Contact the Administrator for access.`)
	        .setColor("#2C2F33");
	      message.channel.send(unsuccessfulembed);
	      resolve(false)
		}
		else resolve(true)
	})	
}