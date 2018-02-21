const Discord = require("discord.js");
const prefix = '.'

module.exports = {
    MessageHandler : function(lowercaseContent, msg) {
        if (lowercaseContent === prefix + 'netplay') {
            var netplayRole = msg.guild.roles.find("name", "Netplay");
            if (!netplayRole) {
                console.log("Server " + msg.guild.name + " does not have a valid Netplay role");
                return;
            }
            if(msg.member.roles.has(netplayRole.id)) {
                msg.member.removeRole(netplayRole).then(guildMember => {
                    msg.reply("removed Netplay role");
                });
            } else {
                msg.member.addRole(netplayRole).then(guildMember => {
                    msg.reply("added Netplay role");
                });
            }
        } else if (lowercaseContent === prefix + 'tournament') { //try making use of usersWithRole(role) http://discordjs.readthedocs.io/en/latest/docs_server.html
            var tournamentRole = msg.guild.roles.find("name", "NetplayTournament");
            if (!tournamentRole) {
                console.log("Server " + msg.guild.name + " does not have a valid NetplayTournament role");
                return;
            }
            if(msg.member.roles.has(tournamentRole.id)) {
                msg.member.removeRole(tournamentRole).then(guildMember => {
                    msg.reply("removed.");
                });
            } else {
                msg.member.addRole(tournamentRole).then(guildmember => {
                    msg.reply("entered. Find brackets @ http://challonge.com/users/sundowns");
                });
            }
        } else if (lowercaseContent === prefix + 'purge') {
            var organiserRole = msg.guild.roles.find("name", "Netplay TO");
            var tournamentRole = msg.guild.roles.find("name", "NetplayTournament");
            if (!organiserRole) {
                console.log("Server " + msg.guild.name + " does not have a valid Netplay TO role");
                return;
            }
            if (!tournamentRole) {
                console.log("Server " + msg.guild.name + " does not have a valid NetplayTournament role");
                return;
            }
            if (msg.member.roles.has(organiserRole.id)) {
                var membersWithRole = msg.guild.roles.get(tournamentRole.id).members;
                var count = 0;
                membersWithRole.forEach(member => {
                    count++;
                    member.removeRole(tournamentRole.id);
                })
                if (count > 0)
                    msg.reply("purged tournament role from " + count + " users.");
            } else {
                msg.reply("you don't have permission to use this command");
            }
        } else if (lowercaseContent === prefix + 'entrants') {
            var tournamentRole = msg.guild.roles.find("name", "NetplayTournament");
            if (!tournamentRole) {
                console.log("Server " + msg.guild.name + " does not have a valid NetplayTournament role");
                return;
            }
            //iterate over all guild members with role & list them in challonge bulk add format
            var membersWithRole = msg.guild.roles.get(tournamentRole.id).members;
            var embed = new Discord.RichEmbed();
            var text = "";
            membersWithRole.forEach(member => {
                if (member.nickname) {
                    text = text + member.nickname + "\n";
                } else {
                    text = text + member.user.username + "\n";
                }
            })
            embed.setTitle("Netplay Tournament Entrants");
            embed.setDescription(text);
            msg.channel.send({embed: embed}).catch(console.error);
        }
    }
}
