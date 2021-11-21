const Discord = require("discord.js");
const axios = require('axios');
const https = require('https');

const authenticate = require('../../authentication/authenticate')

axios.defaults.headers.get['Accept'] = 'application/json';

const agent = new https.Agent({  
  rejectUnauthorized: false
});

module.exports= {
  name: 'search',
  category: 'security',
  description: 'Searches a keyword in a cluster of leaked databases.',
  run: async(client,message,args,guild) => {
    // MESSAGES
    if (!args[0] || !args[1]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: search")
        .setDescription(
          `**Description:** Searches a keyword in a cluster of leaked databases. \n` +
            "**Usage:**\n" +
            "-search [name/email/password/ip] [keyword:regex]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }

    let auth = await authenticate(message)
    if(!auth)
      return
    
    let method = ''
    switch(args[0].toLowerCase())
    {
      case 'name' : {
        method = 'name'
        break
      }
      case 'username' : {
        method = 'name'
        break
      }
      case 'ip' : {
        method = 'ip'
        break
      }
      case 'password' : {
        method = 'password'
        break
      }
      default : {
        method = 'email'
        break
      }
    }

    let querytext = `${method}:${args[1]}`

    axios.get("https://scylla.so/search", {
      params : {
        'q' : querytext,
        'size' : '12'
      },
      httpsAgent: agent
    }).then( (r) => {
      if(r.data.length === 0)
      {
        let unsuccessfulembed = new Discord.MessageEmbed()
          .setTitle(`No results has been found.`)
          .setColor("#2C2F33");
      
        return message.channel.send(unsuccessfulembed);
      }
      let fields = []
      r.data.forEach( (element) => {
        fields.push({
          name : element["fields"].email || element["fields"].name,
          value : element["fields"].password,
          inline: true
        })
      })
      let successfulembed = new Discord.MessageEmbed()
        .setTitle(`Results has been found`)
        .addFields(...fields)
        .setColor("#2C2F33");
    
      return message.channel.send(successfulembed);
    }).catch( (er) => {
      console.log(er)
      let errorembed = new Discord.MessageEmbed()
      .setTitle(`A server error has occurred, please try again later.`)
      .setColor("#2C2F33");
  
      return message.channel.send(errorembed);
    })
  }
}
