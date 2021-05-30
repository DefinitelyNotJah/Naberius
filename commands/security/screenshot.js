const Discord = require("discord.js");
const capture = require('phantomjs-prebuilt')
const fs = require('fs')

const authenticate = require('../../authentication/authenticate')

let inuse = false

module.exports= {
  name: 'screenshot',
  category: 'security',
  description: 'Screenshots a website',
  run: async(client,message,args,guild) => {
    if(inuse)
    {
      let commandinuse = new Discord.MessageEmbed()
        .setTitle("Command: screenshot")
        .setDescription("Command is currently in use, this is done to prevent spamming.")
        .setColor("#2C2F33");
      message.channel.send(commandinuse);
    }
    // MESSAGES
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: screenshot")
        .setDescription(
          `**Description:** Screenshots a website. \n` +
            "**Usage:**\n" +
            "-screenshot [url]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }

    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);

    if (!args[0].match(regex)) {
      const unsuccessfulembed = new Discord.MessageEmbed()
        .setTitle(`Please under a valid website URL.`)
        .setColor("#2C2F33");
      return message.channel.send(unsuccessfulembed);
    }

    let auth = await authenticate(message)
    if(!auth)
      return
    
    inuse = true
    try {
      let screenshot = await capture({
        url: args[0],
        width: 1024,
        height: 768
      })
      await fs.writeFileSync(`${__dirname}/assets/screenshot.png`, screenshot)
    }
    catch (err)
    {
       const errorEmbed = new Discord.MessageEmbed()
        .setColor('#2C2F33')
        .setTitle('An error has occurred.')
        .setDescription('Please try again at a later time.')

      message.channel.send(errorEmbed);
      inuse = false
      return
    }
    const successfulEmbed = new Discord.MessageEmbed()
      .setColor('#2C2F33')
      .setTitle('Here is your screenshot sweetheart.')
      .attachFiles([`${__dirname}/assets/screenshot.png`])
      .setImage('attachment://screenshot.png');

    message.channel.send(successfulEmbed);
    inuse = false
  }
}
