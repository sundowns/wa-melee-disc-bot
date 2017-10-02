const prodToken = 'MzM2MDg3MDc3MzI4Mzg4MDk2.DLOV_w.bT3kYdg5cbJxbXIFzttb5pjzi_Q';
const Discord = require("discord.js");
const client = new Discord.Client();
const misc = require('./misc');
const streams = require('./streams');
const sinbin = require('./sinbin');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    streams.Init(client);
    sinbin.Init(client);
    client.user.setGame("checking his list (twice)");
});

client.on('message', msg => {
    if (msg.author.id == client.user.id) return; //dont let the bot read its own messages
    var lowercaseContent = msg.content.toLowerCase();

    if (lowercaseContent === ".help") {
        msg.channel.send("```css\n .pr => Power Rankings \n .stream => Perth Streams \n .bracket => Perth Challonges \n .netplay => Toggle Netplay Role \n .iso => Game Image Files ```");
    } else if (lowercaseContent === ".uptime") {
        msg.channel.send("I've been livin' for " + client.uptime);
    }
    misc.MessageHandler(lowercaseContent, msg);
    streams.MessageHandler(lowercaseContent, msg);
    sinbin.MessageHandler(lowercaseContent, msg);
});

client.login(prodToken);
