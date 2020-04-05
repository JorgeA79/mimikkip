const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready',() => {
	
	   client.user.setPresence({game: {name: "with Tanjiro", type: 0}});
});

var prefix = "n!"

client.on('message', message => {
	if (message.author === client.user) return;
	if (message.content.startsWith(prefix + 'ping')) {
	
		 message.channel.send(`:ping_pong: Pong! \nTime taken: \`${Date.now() - message.createdTimestamp} ms\``);
	}
});
client.on('message', message => {
	if (message.author === client.user) return;
	if (message.content.startsWith(prefix + 'owo')) {
		var v = message.member.username;
		 message.member.setNickname(`OWO // ${message.author.username}`);
		 message.channel.send(`${message.author.username} xd`);
	}
});
client.on('message', message => {
	
 	if (message.channel.id === "696177326840479745"){
	if (message.author.bot){
	if(message.author.id === "125367104336691200") {
		
	
		
		message.channel.send(`<@&664222622057234432>, New episode!`);
	}}}
});

client.on('guildMemberAdd', member => {
 member.guild.channels.get('696193926633095199').send('xd;
});
	  
//Important
client.login(process.env.BOT_TOKEN);
