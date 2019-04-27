const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready',() => {
	//Edit after game so u can add wut game bot is playing between "" xd
	   client.user.setPresence({game: {name: "", type: 0}});
});

var prefix = "m."

client.on('message', message => {
	if (message.author.bot){
	if (message.content.startsWith('Bungou Stray')) {

		 message.channel.send(`@everyone WHAPAM );
	}}
});

//Important
client.login(process.env.BOT_TOKEN);

