const Discord = require("discord.js");

module.exports= {
  name: 'crack',
  category: 'help',
  description: 'Shows a list of possible commands',
  run: async(client,message,args,guild) => {
    let successfulembed = new Discord.MessageEmbed()
      .setTitle(`Help menu | Cryptography commands`)
      .addFields(
        { name: '-encryptbase64', value: 'Encrypts text to base64.'},
        { name: '-decryptbase64', value: 'Decrypts base64 to UTF-8.'},
      )
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
