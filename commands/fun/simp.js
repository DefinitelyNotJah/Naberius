const Discord = require("discord.js");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

module.exports= {
  name: 'simp',
  category: 'fun',
  description: 'Gives you the simp ratio of a person',
  run: async(client,message,args,guild) => {
    let SimpRate = getRandomInt(0, 100) + "%"
    let cocksucker = ''
    if (message.mentions.users.first())
    {
      cocksucker = message.mentions.users.first().username
    }
    else
    {
      cocksucker = message.author.username
    }
    const successfulembed = new Discord.MessageEmbed()
      .setTitle(`${cocksucker} is ${SimpRate} simp :100: :ok_hand: :joy: `)
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
