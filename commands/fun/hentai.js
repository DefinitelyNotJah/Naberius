const Discord = require("discord.js");
const axios = require("axios")

module.exports= {
  name: 'hentai',
  category: 'fun',
  description: 'I swear to God I was forced to make this.',
  run: async(client,message,args,guild) => {
    const picture = await axios.get("https://neko-love.xyz/api/v1/nekolewd")
    if(picture.data.code == "200")
    {
        const successfulembed = new Discord.MessageEmbed()
        .setTitle(`:flushed: :flushed: :flushed: :flushed: :flushed: `)
        .setColor("#2C2F33")
        .setImage(picture.data.url)
        .setFooter('I swear to god I was forced to make this')
      return message.channel.send(successfulembed);
    } else {
      const errorembed = new Discord.MessageEmbed()
        .setTitle(`No hentai for you hahahaha!!!`)
        .setDescription(`An error occurred`)
        .setColor("#2C2F33");
      return message.channel.send(errorembed);
    }
  }
}
