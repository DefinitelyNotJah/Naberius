const Discord = require("discord.js");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

module.exports= {
  name: 'cock',
  category: 'fun',
  description: 'Measures someone or your cock size',
  run: async(client,message,args,guild) => {
    let Random = getRandomInt(1, 20);

    let RandomPP = "8";
    for (let i = 0; i < Random; i++) {
      RandomPP += "=";
    }
    RandomPP += "D";

    let cocksucker = ''
    if (message.mentions.users.first())
      cocksucker = message.mentions.users.first().username
    else
      cocksucker = message.author.username
    const successfulembed = new Discord.MessageEmbed()
      .setTitle(`${cocksucker}'s cock size is`)
      .setDescription(RandomPP)
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
