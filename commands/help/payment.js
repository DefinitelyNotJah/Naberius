const Discord = require("discord.js");

module.exports= {
  name: 'payment',
  category: 'help',
  description: 'Shows payment commands.',
  run: async(client,message,args,guild) => {
    let successfulembed = new Discord.MessageEmbed()
      .setTitle(`Help menu | Payment`)
      .setDescription(`Contact DefinitelyNotJah for premium access`)
      .addFields(
        { name: '-redeem', value: 'Redeem a token to subscribe.'},
        { name: '-purchase', value: 'Purchase a subscription plan.'},
        { name: '-plans', value: 'Shows available subscription plans.'},
      )
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
