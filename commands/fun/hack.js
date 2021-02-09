const Discord = require("discord.js");
const dox = require('../../includes/dox.json')

module.exports= {
  name: 'hack',
  category: 'fun',
  description: 'Hacks a person for you.',
  run: async(client,message,args,guild) => {
    let target = message.mentions.users.first();
    if(!target) {      
      const helpembed = new Discord.MessageEmbed()
        .setTitle("Command: hack")
        .setDescription(
          `**Description:** Hacks a person for you. \n` +
            "**Usage:**\n" +
            "-hack [user]\n" 
        )
        .setColor("#2C2F33");
      return message.channel.send(helpembed);
    }
    if(target)
    {
      let doxxed = dox[Math.floor(Math.random() * dox.length)]
      let d = new Date(doxxed.birthdate)
      let imageName = ""
      if(doxxed.gender.toLowerCase() == "female")
      {
        imageName = doxxed.picture.split("women/")[1]
      } else {
        imageName = doxxed.picture.split("men/")[1]
      }
      let successfullyembed = new Discord.MessageEmbed()
      .setTitle(`Hack Successfull!`)
      .setDescription(`**${target.username}** has been successfully doxxed by **${message.author.username}**.`)
      .addFields(
        {name : 'First Name', value : doxxed.first_name, inline : true},
        {name : 'Last Name', value : doxxed.last_name, inline : true},
        {name : 'Birthday', value : d.toDateString(), inline : true},
        {name : 'Phone Number', value : doxxed.phone_number, inline : true},
        {name : 'Home Address', value : doxxed.location.street, inline : true},
        {name : 'City', value : doxxed.location.city, inline : true},
        {name : 'State', value : doxxed.location.state, inline : true},
        {name : 'Post Code', value : doxxed.location.postcode, inline : true},
        {name : 'Username', value : target.username, inline : true},
        {name : 'Email', value : doxxed.email, inline : true},
        {name : 'Password', value : doxxed.password, inline : true},
        {name : 'Title', value : doxxed.title, inline : true},
      )
      .attachFiles([`${__dirname}/assets/${doxxed.picture}`])
      .setThumbnail(`attachment://${imageName}`)
      .setColor("#2C2F33");
  
      return message.channel.send(successfullyembed);
    }
  }
}
