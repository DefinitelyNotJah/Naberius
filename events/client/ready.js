var colors = require('colors');

module.exports = client => {
    console.log(colors.green("[Advanced Pentesting Bot] Nebarius : Ready."));
    client.user.setActivity("-help")
    const guild = client.guilds.cache.get("758709681811095574");
	setInterval(function () {
		var memberCount = guild.memberCount
		var memberCountChannel = guild.channels.cache.get("774639738094092338");
		memberCountChannel.setName(`Member Count : ${memberCount}`);
	}, 1000);
}