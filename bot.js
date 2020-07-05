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
		number:	generateWaifu(),
		initialPoints: 0,
		currentPoints: 1
	};
	waifus.set(msg.guild.id, waifuConstruct);
	
	try{
	
	msg.channel.send(waifuConstruct.number & waifuConstruct.currentPoints);		
		
	}catch(error){
	console.error(error)
	}			
	}else{
	if(waifuServer.currentPoints == waifuServer.number){		
	msg.channel.send('Waifu!');	
	waifus.delete(msg.guild.id);	
	}else{
	const points = eval(waifuServer.currentPoints) + eval(1);
	waifuServer.currentPoints = points;	
	msg.channel.send(waifuServer.number & waifuServer.currentPoints);			
	}
	}
});

function generateWaifu(){
let min = 1;
let max = 3;  
return Math.floor(Math.random()*(max - min+1)) + 10;
}


client.login(process.env.BOT_TOKEN);
