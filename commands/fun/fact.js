const Discord = require("discord.js");

const axios = require("axios");

module.exports= {
  name: 'fact',
  category: 'fun',
  description: 'Get to know a random, useless fact',
  run: async(client,message,args,guild) => {
    const res = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en')
    const randomfact = res.data.text
    const successfulembed = new Discord.MessageEmbed()
      .setTitle(randomfact)
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
