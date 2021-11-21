const Discord = require("discord.js");
const axios = require('axios');
const https = require('https');

const authenticate = require('../../authentication/authenticate')

axios.defaults.headers.get['Accept'] = 'application/json';

const agent = new https.Agent({  
  rejectUnauthorized: false
});

module.exports= {
  name: 'advancedsearch',
  category: 'security',
  description: 'Searches a keyword in a cluster of leaked databases. (ADVANCED)',
  run: async(client,message,args,guild) => {
    // MESSAGES
    if (!args[0] || !args[1] || !args[2]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: advancedsearch")
        .setDescription(
          `**Description:** Searches a keyword in a cluster of leaked databases. (ADVANCED)\n` +
            "**Usage:**\n" +
            "-advancedsearch [name/email/password/ip] [keyword:regex] [order]\n" +
            "**Example:**\n" +
            "-advancedsearch email randomemail@gmail.com 2 //Shows the second result \n" 
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
        'size' : '1',
        'start' : args[2] - 1
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
      let element = r.data[0]["fields"]
      let successfulembed = new Discord.MessageEmbed()
        .setTitle(`Results has been found`)
        .addFields(
          { name: 'Source', value: element.domain, inline : true},
          { name: 'Email', value: element.email, inline : true},
          { name: 'Username', value: element.name, inline : true},
          { name: 'Password', value: element.password, inline : true},
          { name: 'IP', value: element.ip, inline : true},
        )
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
