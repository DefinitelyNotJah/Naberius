const Discord = require("discord.js");
module.exports= {
  name: 'mute',
  category: 'moderation',
  description: 'mute a members',
  run: async(client,message,args,guild) => {
    let muted = message.mentions.users.first();
  
    // MESSAGES
    if (!muted) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: mute")
        .setDescription(
          `**Description:** Mute a member. \n` +
            "**Usage:**\n" +
            "-mute [user]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }
  
    if (message.author === muted) {
      let sanctionyourselfembed = new Discord.MessageEmbed()
        .setDescription(`You cannot sanction yourself`)
        .setColor("#2C2F33");
      message.channel.send(sanctionyourselfembed);
  
      return;
    }
  
    if (!message.member.permissions.has("MUTE_MEMBERS")) {
      let nopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "You do not have permission `MUTE_MEMBERS` contact an administrator"
        )
        .setColor("#2C2F33");
      message.channel.send(nopermsembed);
  
      return;
    }
  
    if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
      let botnopermsembed = new Discord.MessageEmbed()
        .setDescription(
          "I do not have `MANAGE_ROLES` permission, please contact an administrator"
        )
        .setColor("#2C2F33");
      message.channel.send(botnopermsembed);
  
      return;
    }
  
    let myRole = message.guild.roles.cache.find(r => r.name === "Muted");

    message.guild.member(muted).roles.add(myRole)
    //muted.roles.add(myRole)

    let successfullyembed = new Discord.MessageEmbed()
      .setTitle(`${muted.tag} has been successfully muted.`)
      .setColor("#2C2F33");
  
    message.channel.send(successfullyembed);
  }
}
