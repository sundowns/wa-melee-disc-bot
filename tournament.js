const Discord = require("discord.js");
const prefix = ".";
var Logger = {};

//TODO: Refactor all these tournamentRole and organiserRole lookups into resuable functions.
//TODO: Refactor the .find statements to be consistent with the rest of the code.

module.exports = {
  Init: function (logger) {
    Logger = logger;
  },
  MessageHandler: function (lowercaseContent, msg) {
    Logger.info({msg})
    if (lowercaseContent === prefix + "netplay") {
      var netplayRole = msg.guild.roles.find("name", "Netplay");
      if (!netplayRole) {
        Logger.error(
          `Server ${msg.guild.name} does not have a valid Netplay role`
        );
        return;
      }
      if (msg.member.roles.has(netplayRole.id)) {
        msg.member.removeRole(netplayRole).then(() => {
          msg.reply("removed Netplay role");
        });
      } else {
        msg.member.addRole(netplayRole).then(() => {
          msg.reply("added Netplay role");
        });
      }
    } else if (lowercaseContent === prefix + "tournament") {
      var tournamentRole = msg.guild.roles.find("name", "NetplayTournament");
      if (!tournamentRole) {
        Logger.error(
          `Server ${msg.guild.name} does not have a valid NetplayTournament role`
        );
        return;
      }
      if (msg.member.roles.has(tournamentRole.id)) {
        msg.member.removeRole(tournamentRole).then(() => {
          msg.reply("removed.");
        });
      } else {
        msg.member.addRole(tournamentRole).then(() => {
          msg.reply(
            "entered. Find brackets @ https://challonge.com/communities/perth-melee"
          );
        });
      }
    } else if (lowercaseContent === prefix + "purge") {
      var organiserRole = msg.guild.roles.find("name", "Netplay TO");
      var tournamentRole = msg.guild.roles.find("name", "NetplayTournament");
      if (!organiserRole) {
        Logger.error(
          `Server ${msg.guild.name} does not have a valid Netplay TO role`
        );
        return;
      }
      if (!tournamentRole) {
        Logger.error(
          `Server ${msg.guild.name} does not have a valid NetplayTournament role`
        );
        return;
      }
      if (msg.member.roles.has(organiserRole.id)) {
        var membersWithRole = msg.guild.roles.get(tournamentRole.id).members;
        var count = 0;
        membersWithRole.forEach((member) => {
          count++;
          member.removeRole(tournamentRole.id);
        });
        if (count > 0) msg.reply(`purged tournament role from ${count} users.`);
      } else {
        msg.reply("you don't have permission to use this command");
      }
    } else if (lowercaseContent === prefix + "entrants") {
      var tournamentRole = msg.guild.roles.find("name", "NetplayTournament");
      if (!tournamentRole) {
        Logger.error(
          `Server ${msg.guild.name} does not have a valid NetplayTournament role`
        );
        return;
      }
      //iterate over all guild members with role & list them in challonge bulk add format
      var membersWithRole = msg.guild.roles.get(tournamentRole.id).members;
      var embed = new Discord.RichEmbed();
      var text = "";
      membersWithRole.forEach((member) => {
        if (member.nickname) {
          text = text + member.nickname + "\n";
        } else {
          text = text + member.user.username + "\n";
        }
      });
      embed.setTitle("Netplay Tournament Entrants");
      embed.setDescription(text);
      msg.channel.send({ embed: embed }).catch(Logger.error);
    }
  },
};
