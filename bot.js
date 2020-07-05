const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

var prefix = "p!";
var waifus = new Map();

var contents = fs.readFileSync("./waifus.json");
var jsonContent = JSON.parse(contents);

client.on('message', async msg => {
	if (msg.author === client.user) return;
	if (msg.author.bot) return;
	const waifuServer = waifus.get(msg.guild.id);
	
	if(!waifuServer){
	const waifuConstruct = {
		textChannel: msg.channel,
		number:	generateWaifu(),
		waifu: Math.floor(Math.random()*jsonContent.waifus.length),
		currentPoints: 1
	};
	waifus.set(msg.guild.id, waifuConstruct);
	
	try{
	
	msg.channel.send(`${waifuConstruct.number} & ${waifuConstruct.currentPoints}`);		
		
	}catch(error){
	console.error(error)
	}			
	}else{
	if(waifuServer.currentPoints == waifuServer.number){		
	var waifu = jsonContent.waifus;
		
	const embed = new Discord.MessageEmbed()
	.setTitle(waifu[waifuServer.waifu].name)
	.setImage(waifu[waifuServer.waifu].image);
	msg.channel.send(embed)	
	
	const filter = m => m.content.toUpperCase().includes(`p!get ${waifu[waifuServer.waifu].name}`);	
	const collector = msg.channel.createMessageCollector(filter, { time: 15000 });

	collector.on('collect', m => {
	msg.channel.send(`${collect.first().author} got the correct answer!`);
	});

	collector.on('end', collected => {
	console.log(`Collected ${collected.size} items`);
	});	
		
		
	}else{
	const points = eval(waifuServer.currentPoints) + eval(1);
	waifuServer.currentPoints = points;	
	msg.channel.send(`${waifuServer.number} & ${waifuServer.currentPoints}`);			
	}
	}
});

function generateWaifu(){
let min = 1;
let max = 3;  
return Math.floor(Math.random()*(max - min+1)) + 1;
}


client.login(process.env.BOT_TOKEN);
