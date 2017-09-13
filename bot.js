const prodToken = 'MzM2MDg3MDc3MzI4Mzg4MDk2.DJp_vw.pvWHKQlZkXlBs4nwDZ23q2ocBmQ';
const Discord = require("discord.js");
const client = new Discord.Client();
const misc = require('./misc');
const streams = require('./streams');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    streams.Init(client);
});

client.on('message', msg => {
    if (msg.author.id == client.user.id) return; //dont let the bot read its own messages
    var lowercaseContent = msg.content.toLowerCase();

    if (lowercaseContent === '.help') {
        msg.channel.send("```css\n .pr => Power Rankings \n .stream => Perth Streams \n .bracket => Perth Challonges \n .netplay => Toggle Netplay Role ```");
    }
    misc.MessageHandler(lowercaseContent, msg);
    streams.MessageHandler(lowercaseContent, msg);
});

client.login(prodToken);
