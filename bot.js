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
		currentPoints: 1,
		mSent: 0
	};
	waifus.set(msg.guild.id, waifuConstruct);
	
	try{
	
	return msg.channel.send(`${waifuConstruct.number} & ${waifuConstruct.currentPoints}`);		
		
	}catch(error){
	console.error(error)
	}			
	}else{
	
	if(waifuServer.currentPoints == waifuServer.number){	
		
	if(waifuServer.mSent == 0){		
	waifuServer.mSent == 1;	
		
	var waifu = jsonContent.waifus;
	const filter = m => m.content.includes(`p!get ${waifu[waifuServer.waifu].name}`);
		
	const embed = new Discord.MessageEmbed()
	.setTitle(waifu[waifuServer.waifu].name)
	.setImage(waifu[waifuServer.waifu].image);
		
	msg.channel.send(embed).then(() => {
	msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
		.then(collected => {
			msg.channel.send(`${collected.first().author} got the correct answer!`);
			waifus.delete(msg.guild.id);
		})
		.catch(collected => {
			msg.channel.send('Looks like nobody got the answer this time.');
			waifus.delete(msg.guild.id);
		});
	});
		
	}else {
	return;
	}		
	}else{
	const points = eval(waifuServer.currentPoints) + eval(1);
	waifuServer.currentPoints = points;	
	return msg.channel.send(`${waifuServer.number} & ${waifuServer.currentPoints}`);			
	}
	}
});

function generateWaifu(){
let min = 1;
let max = 3;  
return Math.floor(Math.random()*(max - min+1)) + 1;
}


client.login(process.env.BOT_TOKEN);
