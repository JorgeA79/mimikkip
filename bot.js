const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = "p!";
var waifus = new Map();

client.on('message', async msg => {
	if (msg.author === client.user) return;
	if (msg.author.bot) return;
	const waifuServer = waifus.get(msg.guild.id);
	
	if(!waifuServer){
	const waifuConstruct = {
		textChannel: msg.channel,
		number:	generateWaifu()		
	};
	waifus.set(msg.guild.id, waifuConstruct);
	
	try{
	
	msg.channel.send(waifuConstruct.number);		
		
	}catch(error){
	console.error(error)
	}			
	}else{
	msg.channel.send(waifuServer.number);		
	}
});

function generateWaifu(){
let min = 10;
let max = 30;  
return Math.floor(Math.random()*(max - min+1)) + 10;
}


client.login(process.env.BOT_TOKEN);
