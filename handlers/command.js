const {readdirSync} = require('fs');
var colors = require('colors');
const ascii = require('ascii-table'); // npm install ascii table 
// If you want you can not add it and do a normal CommandHandler, I have this simply for aesthetics

let table = new ascii("Commands");
table.setHeading(colors.blue('Command'), colors.blue('Load status'));


module.exports  = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(colors.yellow(file), '✅')
            } else {
                table.addRow(colors.yellow(file), '❌')
                continue;
            } if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));


        }
    })
    console.log(table.toString());
}