# Naberius 
Naberius is an info-security discord bot with tons of features and commands that allows you to solve CTF challenges with ease through discord.

<p align="center">
  <img src="https://media.discordapp.net/attachments/674375343309586432/808745226553262090/artworks-000114315459-0hce9o-t500x500.jpg?width=440&height=440" alt="Naberius"/>
</p>

## Setup & Configuration
### Installation
```bash
	git clone https://github.com/DefinitelyNotJah/Naberius
	cd Naberius/
	npm i
```
### Configuration
```bash
	mv config.json.example config.json
	nano config.json
```
And change the following =>
Key | Description 
--- | --- 
admin_id | Your Discord's account ID
discord_token | Your Discord's bot's Token
mapbox_access_token | Your [Mapbox](https://www.mapbox.com)'s access token
pastebin_apikey | Your [Pastebin](https://www.pastebin.com)'s API Key
censys_apiid | Your [Censys](https://censys.io/)'s API ID
censys_secret | Your [Censys](https://censys.io/)'s Secret Key

Everything is absolutely free and you should not pay for access.
If you want to, you can go the extra mile and pay for the API usage for better performance etc.. But I do not recommend doing that.
### Setup & Run
```bash
	pm2 start index.js
```
## Commands
Default prefix is `-`, you can change it in `./events/guild/message.js`
### Help
Command | Action
--- | ---
`crack` | Shows Crack help commands
`fun` | Shows Fun help commands
`help` |  Shows major/global help commands
`mod` | Shows moderation help commands
`payment` | Shows payment help commands
`security` | Shows security help commands
### Crack
Command | Action
--- | --- 
`encryptbase64` | Encrypts a base64 hash
`decryptbase64` | Decrypts a base64 hash
### Security
Command | Action
--- | --- 
`advancedsearch` | Searches a keyword in a cluster of leaked databases
`search` | Searches a keyword in a cluster of leaked databases
`dirbuster` | A tool for directories/files web-sites scanner
`lookup` | Looks up an IP or a domain name
`resolve` | Resolves a domain name to find out the real IP
`scan` | Scans an IP/domain name for ports in range 1-9999
`ddos` | Disturbed denial of service attack against a particular host
### Adminstration
Command | Action
--- | --- 
`add` | Add a mentioned user to subscribed users
`generate` | Generate a token
`strip` | Strip a mentioned user of his subscription
### Moderation
Command | Action
--- | --- 
`ban` | Ban a member, optional time limit
`kick` | kick a member
`mute` | mute a member
`purge` | Purges a chat
`purge` | Purges a chat
`unban` | Unban a member
`unmute` | unmute a members
### Fun
Command | Action
--- | --- 
`8ball` | A magical 8ball will answer your question
`cock` | Measures someone or your cock size
`fact` | Get to know a random, useless fact
`flirt` | Gives you good pick up and/or flirting lines
`gay` | Gives you the gay ratio of a person
`hack` | Hacks a person for you
`music` | Plays some songs
`roll` | Roll a random number between 0-100
`simp` | Gives you the simp ratio of a person
### Payment
Command | Action
--- | --- 
`redeem` | Redeem a token to subscribe
## DDOS Configuration
Everything is pretty straightforward.
We have a `ddos.json` file that requires you to setup and config the servers and the methods.
```bash
	node ddos.json
```
### Concept
The bot will simply ssh connect into the machines you tell it to, and execute specificed bash shells inside a screen session environment.
### Server-side servers configuration
You will need to put your server SSH login credentials so the bot can connect and execute the scripts.
Simply change the following:
```JSON
	"servers" : [
		{
			"host" : "192.168.1.1",
			"user" : "root",
			"password" : "password"
		},
		{
			"host" : "192.168.1.2",
			"user" : "root",
			"password" : "password"
		}
	],
```
If you just have one server, you can do:
```JSON
	"servers" : [
		{
			"host" : "192.168.1.1",
			"user" : "root",
			"password" : "password"
		},
	],
```
### Server-side methods configuration
Now on to the methods, we have:
```JSON
	"methods" : [
		{
			"name" : "udp",
			"command" : "node udp_flooder.js -i %1target1% -p %1port1% -t %1duration1% -m 1",
			"description" : "L4 Node UDP ICMP Flood Attack (-ddos 192.168.1.1 80 60 udp)"
		},
		{
			"name" : "murder",
			"command" : "node murder.js %1target1% %1duration1%",
			"description" : "L7 Node HTTP Flood Attack (-ddos http://google.com/ 0 60 murder)."
		}
	]
```
`name` and `command` fields are necessary while `description` is optional.
**name** corresponds to `[method]` in the `-ddos` command, so when you type `-ddos ... [method]`, the bot will match `[method]` with the `name` in `ddos.json` and executes its' corresponding `commands`.
**command** is the shell our bot is going to execute when it connects to the cluser of server.
The parameters `%1target1%`, `%1port1%` and `%1duration1%` are replaced correspondingly with `[target]`, `[port]` and `[time/s]` when you initiate the `-ddos` command.
### Servers/Machine configuration
Everything is pretty straightforward.
In `/files` there is a necessary file `stopdos.sh` that you have to copy into your machine, it is the bash shell file that will stop the screen session responsible for the ddos attack.
Simply drag it into your machine/servers (the ones in `ddos.json`) and give it executable permissions.
```bash
	chmod +x stopdos.sh
```
This bot comes along with two scripts, one L4 and one L7, they are `udp` and `murder` respectively, if you're planning to use them, drag the contents of the following folders: `/files/udp/` and `/files/murder` onto your machine and that will be it.