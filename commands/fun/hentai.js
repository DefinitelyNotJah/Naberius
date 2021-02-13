const Discord = require("discord.js");
const axios = require("axios")
const insult = require('../../includes/insult.json')

const randomMsg = [
  "did haram stuff :nauseated_face:",
  "looked up hentai :face_vomiting: :face_vomiting:",
  "did the bad :octagonal_sign:",
  "is fapping to hentai :face_with_symbols_over_mouth: :face_with_symbols_over_mouth:",
  "beating his meat to anime :scream: :scream: "
]
module.exports= {
  name: 'hentai',
  category: 'fun',
  description: 'I swear to God I was forced to make this.',
  run: async(client,message,args,guild) => {
    channel = client.channels.cache.get('810148740290576424');
    if (message.channel.nsfw == false) {
      const hallofshame2 = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} GOT CUCK BLOCKED HAHAHAH :joy: :joy: :joy: :joy: `)
      .setColor("#2C2F33")
      const errorembed2 = new Discord.MessageEmbed()
        .setTitle(`This is not an NSFW channel!!!`)
        .setDescription(`No hentai hahahaha get bonked you horny boi`)
        .setColor("#2C2F33");
      channel.send(hallofshame2);
      return message.channel.send(errorembed2);
    }
    const picture = await axios.get("https://neko-love.xyz/api/v1/nekolewd")
    if(picture.data.code == "200")
    {
        const successfulembed = new Discord.MessageEmbed()
        .setTitle(`:flushed: :flushed: :flushed: :flushed: :flushed: `)
        .setColor("#2C2F33")
        .setImage(picture.data.url)
        .setFooter('I swear to god I was forced to make this')
      message.channel.send(successfulembed);
    } else {
      const errorembed = new Discord.MessageEmbed()
        .setTitle(`No hentai for you hahahaha!!!`)
        .setDescription(`An error occurred`)
        .setColor("#2C2F33");
      message.channel.send(errorembed);
    }
    const hallofshame = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} ${randomMsg[Math.floor(Math.random() * randomMsg.length)]}`)
      .setDescription(insult[Math.floor(Math.random() * insult.length)])
      .setColor("#2C2F33")
    channel.send(hallofshame);
  }
}
