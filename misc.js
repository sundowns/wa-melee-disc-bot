const prefix = '.'

module.exports = {
    MessageHandler : function(lowercaseContent, msg) {
        if (lowercaseContent === prefix + 'pr' || lowercaseContent === prefix + 'prs') {
            msg.reply("\n http://imgur.com/RgTHr2M.jpg \n http://i.imgur.com/IqCOIpJ.png");
        } else if (lowercaseContent === prefix + 'stream' || lowercaseContent === prefix + 'streams') {
            msg.reply("\n https://www.twitch.tv/perthsmash \n https://www.smashcast.tv/perthsmash");
        } else if (lowercaseContent === prefix + 'bracket' || lowercaseContent === prefix + 'brackets') {
            msg.reply("\n http://challonge.com/users/maribro \n http://challonge.com/users/perthsmash \n http://challonge.com/users/smashwest");
        }
        else { //free form text detection
            if (lowercaseContent.length > 1000) {
                msg.reply(":exclamation: :octagonal_sign: woah calm down there Mr D'Cruze :octagonal_sign: :exclamation:");
            }
        }
    }
}
