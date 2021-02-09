const Discord = require("discord.js");

module.exports= {
  name: 'encryptbase64',
  category: 'crack',
  description: 'Encrypts a base64 hash.',
  run: async(client,message,args,guild) => {
    // MESSAGES
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: encryptbase64")
        .setDescription(
          `**Description:** Encrypts a base64 hash. \n` +
            "**Usage:**\n" +
            "-encryptbase64 [text]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }

    var b = new Buffer(args.join(' '));

    let successfulembed = new Discord.MessageEmbed()
      .setTitle(`Results has been found`)
      .setDescription(b.toString('base64'))
      .setColor("#2C2F33");
  
    return message.channel.send(successfulembed);
  }
}
