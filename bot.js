const Discord = require('discord.js');

const client = new Discord.Client();


var prefix = "s."

client.on('message', message => {
	if (message.author === client.user) return;
	if (message.content.startsWith('join')) {
    message.delete(1000);
 message.channel.send(`Soy dalia owo);
	}
});

//Important
client.login(process.env.BOT_TOKEN);

