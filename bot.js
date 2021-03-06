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
	
///////////////////////////////////////  M A P S  ///////////////////////////////////////			
	
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

///////////////////////////////////////  S P A W N  ///////////////////////////////////////	
		
	if(waifuServer.mSent == 1) return;			
	waifuServer.mSent = 1;		
	var waifu = jsonContent.waifus;
	//const filter = m => m.content.includes(`p!get ${waifu[waifuServer.waifu].name}`);
	
	const filter = response => {
	return waifu[waifuServer.waifu].name.some(answer => `p!get ${answer.toLowerCase()}` === response.content.toLowerCase());
	};
		
	const embed = new Discord.MessageEmbed()
	.setTitle("Random Waifu just Spawned")
	.setImage(waifu[waifuServer.waifu].image)
	.setFooter('Use `p!get <name>` to add the waifu to your collection')	
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
	
///////////////////////////////////////  C O U N T  ///////////////////////////////////////			
		
	const points = eval(waifuServer.currentPoints) + eval(1);
	waifuServer.currentPoints = points;			
	}
	}
	
///////////////////////////////// D E S C R I P T I O N ////////////////////////////////////
	
	if (msg.content.startsWith(prefix + 'description')) {
	const args = msg.content.slice(prefix.length).split(` `);
		
	if (!args[1]) {
	return msg.channel.send("You need to specify a Waifu");
	}
		
///////////////////////////////////////  W A I F U S  ///////////////////////////////////////	
		
	const waifus = {
	"URARAKA":jsonContent.waifus[0],
	"ATAGO":jsonContent.waifus[1],
	"SYLPHYN":jsonContent.waifus[2],	
	}
	const embed = new Discord.MessageEmbed()
	.setTitle(waifus[args[1].toUpperCase()].displayName)
	.setDescription(waifus[args[1].toUpperCase()].description)
	.addField("Anime/Game:", waifus[args[1].toUpperCase()].anime, true)
	.addField("Gender:", waifus[args[1].toUpperCase()].gender, true)
	.setThumbnail(waifus[args[1].toUpperCase()].image)
	return msg.channel.send(embed);
	}
});

function generateWaifu(){
let min = 10;
let max = 30;  
return Math.floor(Math.random()*(max - min+1)) + 10;
}


client.login(process.env.BOT_TOKEN);
