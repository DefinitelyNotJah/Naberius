const Discord = require("discord.js");

const scan = require('net-scan');
const ports = require('../../includes/ports.json')

const authenticate = require('../../authentication/authenticate')

module.exports= {
  name: 'scan',
  category: 'security',
  description: 'Scans an IP/domain name for ports in range 1-9999',
  run: async(client,message,args,guild) => {
    // MESSAGES
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: scan")
        .setDescription(
          `**Description:** Scans an IP/domain name for ports in range 1-9999. \n` +
            "**Usage:**\n" +
            "-scan [domain/ip]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }

    let auth = await authenticate(message)
    if(!auth)
      return
    
    const PortScanWaiting = new Discord.MessageEmbed()

    .setColor('#2C2F33')
    .setTitle('Scanning... Please wait...')
    .setDescription(`Target : ${args[0]}`)

    let ujedit = await message.channel.send(PortScanWaiting);

    scan.port({
      host: args[0],
      start: 1,
      end: 9999,
      timeout: 5000
    }, function(err, result) {    
      if(err)
      {
        const errorembed = new Discord.MessageEmbed()
          .setTitle(`An error has occured, please try again later.`)
          .setColor("#2C2F33");
        return ujedit.edit(errorembed);
      }
      if(result.length === 0)
      {
        const unsuccessfulembed = new Discord.MessageEmbed()
          .setTitle(`No results has been found.`)
          .setColor("#2C2F33");
        return ujedit.edit(unsuccessfulembed);
      }
      let fields = []
      result.forEach( (e) => {
        if(
          typeof ports != 'undefined' &&
          typeof ports.ports != 'undefined' &&
          typeof ports.ports[`${e}`] != 'undefined' &&
          typeof ports.ports[`${e}`].description != 'undefined'
        )
        {
          fields.push({
            name : e,
            value : ports.ports[`${e}`].description,
            inline: true
          })
        }
        else if(
          typeof ports != 'undefined' &&
          typeof ports.ports != 'undefined' &&
          typeof ports.ports[`${e}`] != 'undefined' &&
          typeof ports.ports[`${e}`][0] != 'undefined' &&
          typeof ports.ports[`${e}`][0].description != 'undefined'
        )
        {
          fields.push({
            name : e,
            value : ports.ports[`${e}`][0].description,
            inline: true
          })
        }
        else
        {
          fields.push({
            name : e,
            value : 'Unknown',
            inline: true
          })
        }
      })
      const PortScanEmbed = new Discord.MessageEmbed()

      .setColor('#2C2F33')
      .setTitle('TCP Port Scan results')
      .setDescription(`Target : ${args[0]}`)
      .addFields(...fields)

      ujedit.edit(PortScanEmbed);
    });
  }
}
