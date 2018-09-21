const prefix = '.'

module.exports = {
    MessageHandler : function(lowercaseContent, msg) {
        if (lowercaseContent === prefix + 'pr' || lowercaseContent === prefix + 'prs') {
            msg.reply("\n https://i.imgur.com/vQ6y16b.png \n https://i.imgur.com/CSIdZ33.png");
        } else if (lowercaseContent === prefix + 'stream' || lowercaseContent === prefix + 'streams') {
            msg.reply("\n https://www.twitch.tv/perthsmash \n https://www.youtube.com/channel/UCl8p1RKYAHgdgDDPS49-bJQ");
        } else if (lowercaseContent === prefix + 'bracket' || lowercaseContent === prefix + 'brackets') {
            msg.reply("\n http://challonge.com/users/maribro \n http://challonge.com/users/perthsmash \n http://challonge.com/users/curtinsmash \n http://challonge.com/users/sundowns (netplay)");
        } else if (lowercaseContent.startsWith(prefix + 'f')) {
            var result = msg.content.match(/\.f (.+)/);
            if (result) {
                msg.channel.send("Press 🇫 to pay respects to " + result[1]).then(message => message.react("🇫"));
            } else if (lowercaseContent === ".f") {
                msg.channel.send("Press 🇫 to pay respects").then(message => message.react("🇫"));
            }
        } else if (lowercaseContent === prefix + 'rule1') {
             msg.reply("\n http://imgur.com/a/NsNqI");
        }
    }
}
