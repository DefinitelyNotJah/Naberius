const Discord = require("discord.js");
module.exports= {
  name: 'purge',
  category: 'moderation',
  description: 'Purges a chat',
  run: async(client,message,args,guild) => {
    // MESSAGES
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: purge")
        .setDescription(
          `**Description:** Purges a chat. \n` +
            "**Usage:**\n" +
            "-purge [number]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }
  
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      let nopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "You do not have permission `MANAGE_MESSAGES` contact an administrator"
        )
        .setColor("#2C2F33");
      message.channel.send(nopermsembed);
  
      return;
    }
  
    if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
      let botnopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "I do not have `MANAGE_MESSAGES` permission, please contact an administrator"
        )
        .setColor("#2C2F33");
      message.channel.send(botnopermsembed);
  
      return;
    }
  
    let chatnumber = parseInt(args[0])

    if(!chatnumber || chatnumber > 100)
    {
      return message.channel.bulkDelete(2);
    }
    return message.channel.bulkDelete(chatnumber)
  }
}
