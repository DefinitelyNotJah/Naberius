const Discord = require("discord.js");

const answers = [
  'Signs point to yes.',
  'Yes.',
  'Reply hazy, try again.',
  'Without a doubt.',
  'My sources say no.',
  'As I see it, yes.',
  'You may rely on it.',
  'Concentrate and ask again.',
  'Outlook not so good.',
  'It is decidedly so.',
  'Better not tell you now.',
  'Very doubtful.',
  'Yes - definitely.',
  'It is certain.',
  'Cannot predict now.',
  'Most likely.',
  'Ask again later.',
  'My reply is no.',
  'Outlook good.',
  'Don\'t count on it.',
  'Who cares?',
  'Never, ever, ever.',
  'Possibly.',
  'There is a small chance.'
]

module.exports= {
  name: '8ball',
  category: 'fun',
  description: 'A magical 8ball will answer your question',
  run: async(client,message,args,guild) => {
    let Message = `The magical :8ball: ball says: \`${answers[Math.floor(Math.random() * answers.length)]}\``;
    const successfulembed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username}'s question : ${message.cleanContent.split('-8ball')[1]}`)
      .setDescription(Message)
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
