const Discord = require('discord.js');
const Discord = require('ffmpeg');
const client = new Discord.Client();


var prefix = "s."

client.on('message', message => {
	if (message.author === client.user) return;
	if (message.content.startsWith('join')) {
    message.delete(1000);
 message.channel.send(`NO`);
	}
});

//Important
client.login(process.env.BOT_TOKEN);

