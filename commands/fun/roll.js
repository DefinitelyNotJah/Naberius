const Discord = require("discord.js");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

module.exports= {
  name: 'roll',
  category: 'fun',
  description: 'Roll a random number between 0-100',
  run: async(client,message,args,guild) => {
    const roll_number = getRandomInt(0, 100)
    const successfulembed = new Discord.MessageEmbed()
      .setTitle(`You rolled ${roll_number} :game_die:`)
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
