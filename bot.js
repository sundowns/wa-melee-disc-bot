const Discord = require("discord.js");
const moment = require("moment");
const winston = require("winston");
const client = new Discord.Client();
const misc = require("./misc");
const tournament = require("./tournament");
// const sinbin = require("./sinbin");
const streams = require("./streams");
const tokens = require("./tokens");

const Logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

client.on("ready", () => {
  Logger.info(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: "online",
    game: { name: "checking his naughty list (twice)" },
  });
  // sinbin.Init(client, Logger);
  streams.Init(client, Logger);
  tournament.Init(Logger);
});

client.on("message", (msg) => {
  if (msg.author.id == client.user.id) return; //dont let the bot read its own messages
  var lowercaseContent = msg.content.toLowerCase();

  if (lowercaseContent === ".help") {
    sendHelpMessage(msg);
  } else if (lowercaseContent === ".uptime") {
    sendUptimeMessage(msg);
  }
  tournament.MessageHandler(lowercaseContent, msg);
  misc.MessageHandler(lowercaseContent, msg);
  // sinbin.MessageHandler(lowercaseContent, msg);
});

const sendHelpMessage = (msg) => {
  var embed = new Discord.RichEmbed();
  embed.setTitle("Available Commands");
  embed.addField("`.pr`", "Show Perth Smash power rankings");
  embed.addField("`.netplay`", "Toggle @Netplay role");
  embed.addField("`.tournament`", "Signup to current netplay tournament");
  embed.addField("`.f <x>`", "Pay respects to <x>");
  msg.channel.send({ embed: embed }).catch(Logger.error);
};

const sendUptimeMessage = (msg) => {
  msg.channel.send(
    `I've been livin' for ${Math.round(
      moment.duration(client.uptime).asMinutes()
    )} minutes.`
  );
};

if (tokens) {
  if (tokens.prod) {
    client.login(tokens.prod);
  } else {
    Logger.error("Failed to locate prod token. Goodbye xoxo");
    process.exit();
  }
}
