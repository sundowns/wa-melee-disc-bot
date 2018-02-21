const fs = require('fs');
const Discord = require("discord.js");
const moment = require("moment");
const client = new Discord.Client();
const misc = require('./misc');
const tournamnet = require('./tournament');
const sinbin = require('./sinbin');
const streams = require("./streams");
const tokens = require("./tokens");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({status: 'online', game: {name: 'checking his naughty list (twice)'}});
    sinbin.Init(client);
    streams.Init(client);
});

client.on('message', msg => {
    if (msg.author.id == client.user.id) return; //dont let the bot read its own messages
    var lowercaseContent = msg.content.toLowerCase();

    if (lowercaseContent === '.help') {
        msg.channel.send("```css\n .pr => Power Rankings \n .stream => Perth Streams \n .bracket => Perth Challonges \n .netplay => Toggle Netplay Role ```");
    } else if (lowercaseContent === ".uptime") {
        msg.channel.send("I've been livin' for " + moment.duration(client.uptime).asMinutes() + " minutes.");
    }
    tournamnet.MessageHandler(lowercaseContent, msg);
    misc.MessageHandler(lowercaseContent, msg);
    sinbin.MessageHandler(lowercaseContent, msg);
});

if (tokens) {
    if (tokens.prod) {
        client.login(tokens.prod);
    } else {
        console.log("Failed to locate prod token. Goodbye xoxo");
        process.exit();
    }
}
