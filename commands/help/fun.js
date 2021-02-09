const Discord = require("discord.js");

module.exports= {
  name: 'fun',
  category: 'help',
  description: 'Shows a list of possible commands',
  run: async(client,message,args,guild) => {
    let successfulembed = new Discord.MessageEmbed()
      .setTitle(`Help menu | General`)
      .setDescription(`Contact DefinitelyNotJah for premium access`)
      .addFields(
        { name: '-music', value: 'Plays some songs.'},
        { name: '-roll', value: 'Roll a random number between 0-100.'},
        { name: '-fact', value: 'Get to know a random, useless fact.'},
        { name: '-cock', value: 'Measures someone or your cock size.'},
        { name: '-8ball', value: 'A magical 8ball will answer your question.'},
        { name: '-flirt', value: 'Gives you good pick up and/or flirting lines.'},
        { name: '-simp', value: 'Gives you the simp ratio of a person.'},
        { name: '-gay', value: 'Gives you the gay ratio of a person.'},
        { name: '-hack', value: 'Hacks a person for you.'},
      )
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
