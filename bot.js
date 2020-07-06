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
	}else{
	
	if(waifuServer.currentPoints == waifuServer.number){	
		
	if(waifuServer.mSent == 1) return;		
	
	waifuServer.mSent = 1;		
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
		
	}else{
	const points = eval(waifuServer.currentPoints) + eval(1);
	waifuServer.currentPoints = points;	
	return;			
	}
	}
	
	if (msg.content.startsWith(prefix + 'description')) {
	const args = msg.content.slice(prefix.length).split(` `);
		
	if (!args.length) {
		return msg.channel.send("You need to specify a Waifu");
	}
		
	const waifus = {
	"URARAKA":jsonContent.waifus[0],
	"ATAGO":jsonContent.waifus[1],
	}
	const embed = new Discord.MessageEmbed()
	.setTitle(waifus[args[1].toUpperCase()].name)
	.setImage(waifus[args[1].toUpperCase()].image)
	return msg.channel.send(embed);
	}
});

function generateWaifu(){
let min = 10;
let max = 30;  
return Math.floor(Math.random()*(max - min+1)) + 10;
}


client.login(process.env.BOT_TOKEN);
