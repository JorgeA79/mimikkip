const Discord = require('discord.js');
const client = new Discord.Client();


var prefix = "s."

client.on('message', message => {
	if (message.author === client.user) return;
	if (message.content.startsWith('join')) {
 message.channel.send(`xd`);

let channel = client.channels.get('594033961097887775');
  channel.join()
	}
});

//Important
client.login(process.env.BOT_TOKEN);

