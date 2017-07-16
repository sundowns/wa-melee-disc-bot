"use strict";
const prodToken = 'MzM2MDg3MDc3MzI4Mzg4MDk2.DEzM_g.bQmGftaFKu5doxCfyN8XV6kyq1s';
const Discord = require("discord.js");
const client = new Discord.Client();
const misc = require('./misc');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', msg => {
    if (msg.author.id == client.user.id) return; //dont let the bot read its own messages
    var lowercaseContent = msg.content.toLowerCase();

    if (lowercaseContent === '.help') {
        msg.channel.send("```css\n .pr => Power Rankings \n .stream => Perth Streams \n .bracket => Perth Challonges```");
    }
    misc.MessageHandler(lowercaseContent, msg);
});

client.login(prodToken);
