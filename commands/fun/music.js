const Discord = require("discord.js");

const ytdl = require('ytdl-core');
const yts = require( 'yt-search' )

const fs = require('fs');

let dispatcher
let paused = false
let video

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

module.exports= {
  name: 'music',
  category: 'fun',
  description: 'Plays some songs.',
  run: async(client,message,args,guild) => {
    const muteinfoembed = new Discord.MessageEmbed()
    .setTitle("Command: music")
    .setDescription(
      `**Description:** Plays some songs. \n` +
        "**WARNING:**\n" +
        "You need to be in a voice channel to use this command.\n" +
        "**COMMANDS:**\n" +
        "-music play <keyword/link>\n" +
        "-music stop\n" +
        "-music resume\n" +
        "-music disconnect\n"
    )
    .setColor("#2C2F33");
    if (!message.member.voice.channel || !args[0]) {
      message.channel.send(muteinfoembed);
      return;
    }
    if(args[0].toUpperCase() === "PLAY")
    {
      if(!args[1])
      {
        message.channel.send(muteinfoembed);
        return 
      }
      let rasas
      let searchterm = ""
      try {
        if(!youtube_parser(args[1]))
        {
          args.forEach( (element, index, arr) => {
            if(index > 0)
            {
              searchterm = searchterm.concat(`${element} `)
            }
          })
          rasas = await yts( searchterm )
          video = rasas.videos ? rasas.videos[0] : rasas
        }
        else
        {
          searchterm = youtube_parser(args[1])
          rasas = await yts( { videoId: searchterm })
          video = rasas
        }
      }
      catch (err) {
        console.log('1' + err)
        const unsuccessful = new Discord.MessageEmbed()
          .setTitle(`:musical_note: Oh no :frowning:`)
          .setDescription(`Could not find what you're looking for, please try another keyword.`)
          .setColor("#2C2F33");
        return message.channel.send(unsuccessful);
      }

      let songofplay = await ytdl(video.url, { 
          filter: 'audioonly',
        })
      const connection = await message.member.voice.channel.join();
      dispatcher = connection.play(songofplay);
      paused = false
      const successfulembed = new Discord.MessageEmbed()
        .setTitle(`:musical_note: Playing ${video.title}`)
        .setURL(video.url)
        .setThumbnail(video.image)
        .setDescription(`Brought to you by ${video.author.name} for ${video.timestamp}m :smile: `)
        .setColor("#2C2F33");
      message.channel.send(successfulembed);
      dispatcher.on('finish', () => {
        const successfulembed2 = new Discord.MessageEmbed()
          .setTitle(`:musical_note: Leaving voice-channel`)
          .setURL(video.url)
          .setThumbnail(video.image)
          .setDescription(`Farewell, Song :weary:`)
          .setColor("#2C2F33");
        message.channel.send(successfulembed2);
        message.member.voice.channel.leave()
        return dispatcher.destroy()
      });
    }
    else if(args[0].toUpperCase() == "STOP") {
      if(!dispatcher)
        return message.channel.send(muteinfoembed);
      if(!paused)
      {
        dispatcher.pause();
        const successfulembed3 = new Discord.MessageEmbed()
          .setTitle(`:musical_note: Pausing ${video.title}`)
          .setURL(video.url)
          .setThumbnail(video.image)
          .setDescription(`Paused the song :pause_button:`)
          .setColor("#2C2F33");
        message.channel.send(successfulembed3);
        paused = true
      }
      else
      {
        const successfulembed4 = new Discord.MessageEmbed()
          .setTitle(`:musical_note: Nothing to pause here`)
          .setURL(video.url)
          .setThumbnail(video.image)
          .setDescription(`Song is already paused :pause_button:`)
          .setColor("#2C2F33");
        message.channel.send(successfulembed4);
      }
    }
    else if(args[0].toUpperCase() == "RESUME") {
      if(!dispatcher)
        return message.channel.send(muteinfoembed);
      if(paused)
      {
        dispatcher.resume();
        const successfulembed5 = new Discord.MessageEmbed()
          .setTitle(`:musical_note: Resumed ${video.title}`)
          .setURL(video.url)
          .setThumbnail(video.image)
          .setDescription(`Just resumed the song!`)
          .setColor("#2C2F33");
        message.channel.send(successfulembed5);
        paused = false
      }
      else
      {
        const successfulembed6 = new Discord.MessageEmbed()
          .setTitle(`:musical_note: Nothing to resume here`)
          .setURL(video.url)
          .setThumbnail(video.image)
          .setDescription(`Song is already playing.`)
          .setColor("#2C2F33");
        message.channel.send(successfulembed6);
      }
    }
    else if(args[0].toUpperCase() == "DISCONNECT" ) {
      if(!dispatcher)
        return message.channel.send(muteinfoembed);
      message.member.voice.channel.leave()
      dispatcher.destroy()
      const successfulembed7 = new Discord.MessageEmbed()
        .setTitle(`:musical_note: Disconnected the bot`)
        .setURL(video.url)
        .setThumbnail(video.image)
        .setDescription(`Farewell :octagonal_sign: `)
        .setColor("#2C2F33");
      message.channel.send(successfulembed7);
      return dispatcher = undefined
    }
  }
}
