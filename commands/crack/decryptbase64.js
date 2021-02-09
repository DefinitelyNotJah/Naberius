const Discord = require("discord.js");

module.exports= {
  name: 'decryptbase64',
  category: 'crack',
  description: 'Decrypts a base64 hash.',
  run: async(client,message,args,guild) => {
    // MESSAGES
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: decryptbase64")
        .setDescription(
          `**Description:** Decrypts a base64 hash. \n` +
            "**Usage:**\n" +
            "-decryptbase64 [base64_hash]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }

    var b = new Buffer(args.join(' '), 'base64')

    let successfulembed = new Discord.MessageEmbed()
      .setTitle(`Results has been found`)
      .setDescription(b.toString())
      .setColor("#2C2F33");
  
    return message.channel.send(successfulembed);
  }
}
