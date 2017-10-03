const prefix = '.'

module.exports = {
    MessageHandler : function(lowercaseContent, msg) {
        if (lowercaseContent === prefix + 'pr' || lowercaseContent === prefix + 'prs') {
            msg.reply("\n http://imgur.com/RgTHr2M.jpg \n http://i.imgur.com/IqCOIpJ.png");
        } else if (lowercaseContent === prefix + 'stream' || lowercaseContent === prefix + 'streams') {
            msg.reply("\n https://www.twitch.tv/perthsmash \n https://www.smashcast.tv/perthsmash");
        } else if (lowercaseContent === prefix + 'bracket' || lowercaseContent === prefix + 'brackets') {
            msg.reply("\n http://challonge.com/users/maribro \n http://challonge.com/users/perthsmash \n http://challonge.com/users/curtinsmash");
        } else if (lowercaseContent === prefix + 'netplay') {
            var netplayRole = msg.guild.roles.find("name", "Netplay");
            if(msg.member.roles.has(netplayRole.id)) {
                msg.member.removeRole(netplayRole);
                msg.reply("removed Netplay role");
            } else {
                msg.member.addRole(netplayRole);
                msg.reply("added Netplay role");
            }
        } else if (lowercaseContent.startsWith(prefix + 'f')) {
            var result = lowercaseContent.match(/\.f (.+)/);
            if (result) {
                msg.channel.send("Press 🇫 to pay respects to " + result[1]).then(message => message.react("🇫"));
            } else {
                msg.channel.send("Press 🇫 to pay respects").then(message => message.react("🇫"));
            }
        }
        else { //free form text detection
            // if (lowercaseContent.length > 1500) {
            //     msg.reply(":exclamation: :octagonal_sign: woah calm down there Mr D'Cruze :octagonal_sign: :exclamation:");
            // }
        }
    }
}
