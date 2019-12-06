const Discord = require('discord.js');
const client = new Discord.Client();


var prefix = "s."

client.on('message', message => {
	if (message.author === client.user) return;
	if (message.content.startsWith('join')) {
 
 const channel = client.channels.get("594033961097887775");
		
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    // Yay, it worked!
    console.log("Successfully connected.");
  }).catch(e => {
    // Oh no, it errored! Let's log it to console :)
    console.error(e);
  });
	}
});

//Important
client.login(process.env.BOT_TOKEN);

