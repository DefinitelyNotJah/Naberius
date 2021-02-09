const Discord = require("discord.js");

module.exports= {
  name: 'security',
  category: 'help',
  description: 'Shows a list of possible commands',
  run: async(client,message,args,guild) => {
    let successfulembed = new Discord.MessageEmbed()
      .setTitle(`Help menu | Security commands`)
      .setDescription(`Contact DefinitelyNotJah for premium access`)
      .addFields(
        { name: '-lookup', value: 'Looks up an IP or a domain name.'},
        { name: '-scan', value: 'Scans an IP/domain name for ports in range 1-9999.'},
        { name: '-search', value: 'Searches a keyword in a cluster of leaked databases.'},
        { name: '-advancedsearch', value: 'Searches a keyword in a cluster of leaked databases. (ADVANCED)'},
        //{ name: '-ddos', value: 'Disturbed denial of service attack against a particular host.'},
        { name: '-dirbuster', value: 'A tool for directories/files web-sites scanner.'},
        { name: '-resolve', value: 'Resolves an domain name to find out the real IP.'},
        { name: '-screenshot', value: 'Screenshots a website.'},
      )
      .setColor("#2C2F33");
    return message.channel.send(successfulembed);
  }
}
