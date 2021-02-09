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

If you want, you can go the extra mile and pay for the API usage for better performance etc.. But I do not recommend doing that.
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
