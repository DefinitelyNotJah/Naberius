const db = require('../../functions/dbutils')
module.exports = async (client,message) => {
  let prefix = "-";

  // Avoid bot commands

  if (message.author.bot) return;

  // Avoid DM commands

  //if (message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  // If a command does not start with the prefix "-" do nothing
  
  if (!command.startsWith(prefix)) return;

  db.log({
    id : message.author.id,
    content : message.content,
    tag : message.author.tag
  })
   // Get command
   
  let cmd = client.commands.get(command.slice(prefix.length));

  if (!cmd) return;

  if (cmd) cmd.run(client, message, args);
}