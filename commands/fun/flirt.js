const Discord = require("discord.js");
const flirt = require('../../includes/flirt.json')

const answers = flirt.flirt

module.exports= {
  name: 'flirt',
  category: 'fun',
  description: 'Gives you good pick up and/or flirting lines',
  run: async(client,message,args,guild) => {
    let Message = answers[Math.floor(Math.random() * answers.length)]
    const successfulembed = new Discord.MessageEmbed()
      .setTitle(`This one will get you some pussy for sure!`)
      .setDescription(Message)
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
