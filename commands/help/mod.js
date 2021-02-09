const Discord = require("discord.js");

module.exports= {
  name: 'mod',
  category: 'help',
  description: 'Shows a list of possible commands',
  run: async(client,message,args,guild) => {
    let successfulembed = new Discord.MessageEmbed()
      .setTitle(`Help menu | Moderation commands`)
      .setDescription(`Contact DefinitelyNotJah for premium access`)
      .addFields(
        { name: '-ban', value: 'Ban a member, optional time limit.'},
        { name: '-unban', value: 'Unban a member.'},
        { name: '-kick', value: 'Kick a member.'},
        { name: '-mute', value: 'Mute a member.'},
        { name: '-unmute', value: 'Unmute a member.'},
        { name: '-purge', value: 'Purges a chat.'},
      )
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
