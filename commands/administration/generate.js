const Discord = require("discord.js");
const user = require('../../functions/dbutils')
const config = require('../../config.json')
const generateString = require('../../functions/generateString')
module.exports= {
  name: 'generate',
  category: 'administration',
  description: 'Generate a token.',
  run: async(client,message,args,guild) => {
    if(message.author.id != config.admin_id)
      return

    let tk_id = generateString(8)
    user.addToken({
      id : tk_id,
      comment : `Generated by ${message.author.tag}`
    })

    let successfulembed = new Discord.MessageEmbed()
      .setTitle(`A token has successfuly been generated.`)
      .setDescription(`Details and value are sent to ${message.author.tag} privately.`)
      .setColor("#2C2F33");
  
    message.channel.send(successfulembed);


    let successfulembed2 = new Discord.MessageEmbed()
      .setTitle(`Token value : ${tk_id}`)
      .setColor("#2C2F33");
  
    return message.author.send(successfulembed2);
  }
}
