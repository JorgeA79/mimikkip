const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready',() => {
	//Edit after game so u can add wut game bot is playing between "" xd
	   client.user.setPresence({game: {name: "", type: 0}});
});

var prefix = "s."

client.on('message', message => {
	if (message.author.bot){
	if (message.content.startsWith('join')) {

let channel = client.channels.get('594033961097887775');
  channel.join()
	}}
});

//Important
client.login(process.env.BOT_TOKEN);

