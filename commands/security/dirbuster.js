const Discord = require("discord.js");

const dirWalker = require('../../functions/dirw4lker');

const config = require('../../config.json')
var beingused = false;

var PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI(config.pastebin_apikey);

const authenticate = require('../../authentication/authenticate')

module.exports= {
  name: 'dirbuster',
  category: 'security',
  description: 'A tool for directories/files web-sites scanner.',
  run: async(client,message,args,guild) => {
    // MESSAGES
    if (!args[0]) {
      let muteinfoembed = new Discord.MessageEmbed()
        .setTitle("Command: dirbuster")
        .setDescription(
          `**Description:** A tool for directories/files web-sites scanner. \n` +
            "**Usage:**\n" +
            "-dirbuster [site] [ext:optional]\n" +
            "-dirbuster vuln [site]\n" +
            "**Example:**\n" +
            "-dirbuster http://www.google.com/ html,php\n" +
            "Use a commas **,** to seperate the extensions (ext)\n" +
            "-dirbuster vuln http://www.google.com/\n" +
            "The vuln parameter looks for database backups, user lists, etc...\n"
        )
        .setColor("#2C2F33");
      message.channel.send(muteinfoembed);
  
      return;
    }

    if(beingused)
    {
      const unsuccessfulembe = new Discord.MessageEmbed()
        .setTitle(`This command is being in use by someone else, please try again later.`)
        .setColor("#2C2F33");
      return message.channel.send(unsuccessfulembe);
    }
    
    let auth = await authenticate(message)
    if(!auth)
      return

    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);

    if (!args[0].match(regex) && args[0].toLowerCase() != "vuln") {
      const unsuccessfulembed = new Discord.MessageEmbed()
        .setTitle(`Please under a valid website URL.`)
        .setColor("#2C2F33");
      return message.channel.send(unsuccessfulembed);
    }

    if(args[0].toLowerCase() == "vuln" && !args[1].match(regex))
    {
      const unsuccessfulembed = new Discord.MessageEmbed()
        .setTitle(`Please under a valid website URL.`)
        .setColor("#2C2F33");
      return message.channel.send(unsuccessfulembed);
    }
    beingused = true

    const DirbusterWaiting = new Discord.MessageEmbed()

    .setColor('#2C2F33')
    .setTitle(args[0].toLowerCase() == "vuln" ? 'Doing a vuln type dirbuster scan.. This will take a while...' : 'Dirbuster is scanning.. Please wait...')
    .setDescription(args[0].toLowerCase() == "vuln" ? `Target : ${args[1]}` : `Target : ${args[0]}`)

    let ujedit = await message.channel.send(DirbusterWaiting);

    let config = {}
    if(args[0].toLowerCase() == "vuln")
    {
      config = {
        host: args[1],
        listDir: `${__dirname}/assets/dirs.txt`,
        dns: '8.8.8.8,8.8.4.4',
        asyncRequests: true,
        maxConcurrency: 50,
        timeout: 10000
      };
    } else {
      config = {
        host: args[0],
        ext: args[1],
        dns: '8.8.8.8,8.8.4.4',
        asyncRequests: true,
        maxConcurrency: 50,
        timeout: 10000
      };
    }
 
    const result = await dirWalker.launch(config);
    beingused = false
    let legendaryresults = []
    result.founds.forEach((r) => {
      if(["200", "204", "301", "307", "401", "403"].includes(r.res.split(`\r`)[0].slice(9).slice(0, 3)))
        legendaryresults.push(`${r.target} ${r.ms}ms ${r.res.split(`\r`)[0].slice(9)}`)
    })
    if(legendaryresults.length < 40)
    {
      const SuccessfulDirbuster = new Discord.MessageEmbed()

      .setColor('#2C2F33')
      .setTitle(`FOUNDS: ${legendaryresults.length}/${result.sent}`)
      .setDescription(legendaryresults.join("\n"))

      return ujedit.edit(SuccessfulDirbuster);
    }
    pastebin
    .createPaste({
        text: legendaryresults.join("\n"),
        title: "Private",
        format: null,
        privacy: 1
    })
    .then(function (response) {
      const SuccessfulDirbuster2 = new Discord.MessageEmbed()

      .setColor('#2C2F33')
      .setTitle(`FOUNDS: ${result.founds.length}/${result.sent}`)
      .setDescription(`The results far exceeds Discord's message limit.\n` +
        `You can find them here : ${response}`)

      return ujedit.edit(SuccessfulDirbuster2);
    })
    .catch(function (error) {
      const unsuccessfulembed = new Discord.MessageEmbed()
      .setTitle(`No results has been found.`)
      .setColor("#2C2F33");
      return ujedit.edit(unsuccessfulembed);
    });
  }
}
