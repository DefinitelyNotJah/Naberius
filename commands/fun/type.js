const Discord = require("discord.js");
const Store = require('../../handlers/store');
const quote = "I fucked your mother and I fucked your brother not to mention I fucked your father!"
module.exports= {
  name: 'type',
  category: 'fun',
  description: 'Type a text to measure your WPM.',
  run: async(client,message,args,guild) => {
    if(Store.get("typing") == true)
    {
      const ongoingembed = new Discord.MessageEmbed()
        .setTitle(`There's a match going please be patient.`)
        .setColor("#2C2F33");
      return message.channel.send(ongoingembed);
    }
    Store.set("typing", true)
    const startingMZ = new Discord.MessageEmbed()
      .setTitle(`Type the following quote in x seconds :`)
      .setDescription(quote)
      .setColor("#2C2F33");
    let MatchStarting = await message.channel.send(startingMZ);
  }
}
