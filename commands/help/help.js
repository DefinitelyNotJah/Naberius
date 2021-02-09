const Discord = require("discord.js");

module.exports= {
  name: 'help',
  category: 'help',
  description: 'Shows a list of possible commands',
  run: async(client,message,args,guild) => {
    let successfulembed = new Discord.MessageEmbed()
      .setTitle(`Help menu | General`)
      .setDescription(`Contact DefinitelyNotJah for premium access`)
      .addFields(
        { name: '-help', value: 'Shows general help menu.'},
        { name: '-mod', value: 'Shows moderation commands.'},
        { name: '-security', value: 'Shows cyber-security commands.'},
        { name: '-crack', value: 'Shows cryptography commands.'},
        { name: '-payment', value: 'Shows payment commands.'},
        { name: '-fun', value: 'Shows fun commands.'},
      )
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
