const Discord = require("discord.js");
const user = require('../../functions/dbutils')
const config = require('../../config.json')
module.exports= {
  name: 'strip',
  category: 'administration',
  description: 'Strip a mentioned user of his subscription.',
  run: async(client,message,args,guild) => {
    if(message.author.id != config.admin_id)
      return
    let targetId = message.mentions.users.first() || client.users.resolve(args[0]);
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: strip")
        .setDescription(
          `**Description:** Strip a mentioned user of his subscription. \n` +
            "**Usage:**\n" +
            "-strip [user]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }
    const req = user.getUser( targetId.id )
    if(!req)
    {
      let successfullyembed = new Discord.MessageEmbed()
        .setTitle(`${targetId.tag} is already not subscribed.`)
        .setColor("#2C2F33");
    
      message.channel.send(successfullyembed);
      return
    }
    user.deleteUser( targetId.id )
    let successfullyembed3 = new Discord.MessageEmbed()
      .setTitle(`${targetId.tag} has successfully been stripped of his subscription.`)
      .setColor("#2C2F33");
  
    message.channel.send(successfullyembed3);
    return
  }
}
