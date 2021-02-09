const Discord = require("discord.js");
const axios = require('axios');

const dns = require('dns')
const dbip = require('dbip')

const authenticate = require('../../authentication/authenticate')

const config = require('../../config.json')

axios.defaults.headers.get['Accept'] = 'application/json';

module.exports= {
  name: 'lookup',
  category: 'security',
  description: 'Looks up an IP or a domain name',
  run: async(client,message,args,guild) => {
    // MESSAGES
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: lookup")
        .setDescription(
          `**Description:** Looks up an IP or a domain name. \n` +
            "**Usage:**\n" +
            "-lookup [domain/ip]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }

    let auth = await authenticate(message)
    if(!auth)
      return
    
    const unsuccessfulembed = new Discord.MessageEmbed()
    .setTitle(`No results has been found.`)
    .setColor("#2C2F33");

    dns.lookup(args[0], function(err, addresses, family){
      if(!addresses)
        return message.channel.send(unsuccessfulembed);

      dbip(addresses).then(info => {
        if(!info)
          return message.channel.send(unsuccessfulembed);


        const coordinates = info["Coordinates"].split(', ')
        const exampleEmbed = new Discord.MessageEmbed()

        .setColor('#2C2F33')
        .setTitle('DNS Lookup')
        .setDescription('Contact DefinitelyNotJah for premium access')
        .addFields(
          { name: 'IP Address : ', value: info["IP Address"], inline : true},
          { name: 'Address type : ', value: info["Address type"], inline : true},
          { name: 'Family : ', value: family , inline : true},
          { name: 'ISP : ', value: info["ISP"], inline : true},
          { name: 'Organization : ', value: info["Organization"], inline : true},
          { name: 'Country : ', value: info["Country"], inline : true},
          { name: 'Region : ', value: info["State / Region"], inline : true},
          { name: 'District : ', value: info["District / County"], inline : true},
          { name: 'City : ', value: info["City"], inline : true},
          { name: 'Timezone : ', value: info["Timezone"], inline : true},
          { name: 'Coordinates : ', value: info["Coordinates"], inline : true}
        )
        .setImage(`https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-s+5C2020(${coordinates[1]},${coordinates[0]})/${coordinates[1]},${coordinates[0]},${config.mapbox_zoom_value},0/420x180?access_token=${config.mapbox_access_token}`)

        message.channel.send(exampleEmbed);
      })
    });

  }
}
