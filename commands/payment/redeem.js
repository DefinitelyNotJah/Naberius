const Discord = require("discord.js");
const user = require('../../functions/dbutils')

module.exports= {
  name: 'redeem',
  category: 'payment',
  description: 'Redeem a token to subscribe.',
  run: async(client,message,args,guild) => {
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: redeem")
        .setDescription(
          `**Description:** Redeem a token to subscribe. \n` +
          `You can purchase a token by using the command : -purchase . \n` +
            "**Usage:**\n" +
            "-redeem [token]\n" 
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }
    let unsuccessfulembed = new Discord.MessageEmbed()
      .setTitle(`${args[0]} is an invalid token`)
      .setColor("#2C2F33");
    if(args[0].length !== 8)
      return message.channel.send(unsuccessfulembed);

    const letoken = user.getToken(args[0])
    if(!letoken)
      return message.channel.send(unsuccessfulembed);

    const req = await user.getUser(message.author.id)

    if(!req)
    {
      user.addUser({
        id : message.author.id,
        tag : message.author.tag,
        tokens : [`${args[0]}`],
        comment : [`Used a token`]
      })
      user.deleteToken(args[0])
      let successfull = new Discord.MessageEmbed()
        .setTitle(`You have successfully subscribed.`)
        .setDescription(`You (${message.author.tag}) used token **${args[0]}**.`)
        .setColor("#2C2F33");
      return message.channel.send(successfull);
    }

    let successfull2 = new Discord.MessageEmbed()
      .setTitle(`You are already subscribed.`)
      .setColor("#2C2F33");
    return message.channel.send(successfull2);
  }
}
