const Discord = require("discord.js");
const axios = require('axios');

const config = require('../../config.json')
const authenticate = require('../../authentication/authenticate')

module.exports= {
  name: 'resolve',
  category: 'security',
  description: 'Resolves an domain name to find out the real IP.',
  run: async(client,message,args,guild) => {
    // MESSAGES
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: resolve")
        .setDescription(
          `**Description:** Resolves an domain name to find out the real IP. \n` +
            "**Usage:**\n" +
            "-resolve [domain]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }

    let auth = await authenticate(message)
    if(!auth)
      return


    const expression = /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/gi;
    const regex = new RegExp(expression);

    if (!args[0].match(regex)) {
      const unsuccessfulembed = new Discord.MessageEmbed()
        .setTitle(`Please under a domain name.`)
        .setColor("#2C2F33");
      return message.channel.send(unsuccessfulembed);
    }

  let defaultHeaders = {
            'content-type': 'application/json',
            'authorization': '',
            'cache-control': 'no-cache',
            'user-agent': 'censys-cli/1.0'
          }

    // compute Authorization header from id and secret
    const buf = Buffer.from(`${config.censys_apiid}:${config.censys_secret}`, 'ascii');
    defaultHeaders.authorization = `Basic ${buf.toString('base64')}`;

    axios.post("https://censys.io/api/v1/search/ipv4", {
        'query' : args[0],
        'page' : 1,
        'flatten' : false
      }, {
        headers : defaultHeaders
      }
    ).then( (r) => {
      let fields = []
      r.data.results.forEach( (e) => {
        fields.push({
          name : `${e.ip} (${e.location.country_code})`,
          value : e.protocols.join('\n'),
          inline: true
        })
      })
      if(r.data.status != 'ok')
      {
        let unsuccessfulembed = new Discord.MessageEmbed()
          .setTitle(`No results has been found.`)
          .setColor("#2C2F33");
      
        return message.channel.send(unsuccessfulembed);
      }
      let successfulembed = new Discord.MessageEmbed()
        .setTitle(`Results has been found`)
        .setDescription(`Number of found results : ${r.data.results.length}\n` +
          `Please use -lookup to confirm`)
        .addFields(...fields)
        .setColor("#2C2F33");
    
      return message.channel.send(successfulembed);
    }).catch( (er) => {
      let errorembed = new Discord.MessageEmbed()
      .setTitle(`A server error has occurred, please try again later.`)
      .setColor("#2C2F33");
  
      return message.channel.send(errorembed);
    })
  }
}
