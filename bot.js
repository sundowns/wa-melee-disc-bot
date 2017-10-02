const prodToken = 'MzM2MDg3MDc3MzI4Mzg4MDk2.DE9Iuw.Waw6_a0OnhqGSEoJzZqrDZegNk0';
const Discord = require("discord.js");
const client = new Discord.Client();
const misc = require('./misc');
//const sinbin = require('./sinbin');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //sinbin.Init(client);
});

client.on('message', msg => {
    if (msg.author.id == client.user.id) return; //dont let the bot read its own messages
    var lowercaseContent = msg.content.toLowerCase();

    if (lowercaseContent === '.help') {
        msg.channel.send("```css\n .pr => Power Rankings \n .stream => Perth Streams \n .bracket => Perth Challonges \n .netplay => Toggle Netplay Role ```");
    }
    misc.MessageHandler(lowercaseContent, msg);
    //sinbin.MessageHandler(lowercaseContent, msg);
});

client.login(prodToken);
