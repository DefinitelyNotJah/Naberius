const Discord = require("discord.js");
const user = require('../../functions/dbutils')
const config = require('../../config.json')
module.exports= {
  name: 'add',
  category: 'administration',
  description: 'Add a mentioned user to subscribed users.',
  run: async(client,message,args,guild) => {
    if(message.author.id != config.admin_id)
      return
    let targetId = message.mentions.users.first() || client.users.resolve(args[0]);
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: add")
        .setDescription(
          `**Description:** Add a mentioned user to subscribed users. \n` +
            "**Usage:**\n" +
            "-add [user]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }
    const req = user.getUser(targetId.id)
    if(!req)
    {
      user.addUser({
        id : targetId.id,
        tag : targetId.tag,
        tokens : [],
        comment : [`Added by ${message.author.tag}`]
      })
      let successfullyembed = new Discord.MessageEmbed()
        .setTitle(`${targetId.tag} has been successfully added.`)
        .setColor("#2C2F33");
    
      message.channel.send(successfullyembed);
      return
    }
    let successfullyembed3 = new Discord.MessageEmbed()
      .setTitle(`${targetId.tag} is already subscribed.`)
      .setColor("#2C2F33");
  
    message.channel.send(successfullyembed3);
    return
  }
}
