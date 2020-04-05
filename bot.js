const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready',() => {
	
	   client.user.setPresence({game: {name: "with Tanjiro", type: 0}});
 	   client.user.setUsername("Nezuko");
});

var prefix = "n!"

client.on('message', message => {
	if (message.author === client.user) return;
	if (message.content.startsWith(prefix + 'ping')) {
	
		 message.channel.send(`:ping_pong: Pong! \nTime taken: \`${Date.now() - message.createdTimestamp} ms\``);
	}
});

client.on('message', message => {
	
 	if (message.channel.id === "696466093018972161"){
	if (message.author.bot){
	if(message.author.id === "125367104336691200") {
		
	
		
		message.channel.send(`<@&696466852196646942>, New episode!`);
	}}}
});

client.on('guildMemberAdd', member => {
	 var j = member.displayName;
	 member.setNickname(`OWO // `+ j);
});
	  
//Important
client.login(process.env.BOT_TOKEN);
