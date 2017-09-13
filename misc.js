const prefix = '.'

module.exports = {
    MessageHandler : function(lowercaseContent, msg) {
        if (lowercaseContent === prefix + 'pr' || lowercaseContent === prefix + 'prs') {
            msg.reply("\n https://i.imgur.com/1DmMWem.png \n https://i.imgur.com/CSIdZ33.png");
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
        } else if (lowercaseContent === prefix + 'rule1') {
            msg.reply("\n http://imgur.com/a/NsNqI");
        }
        else { //free form text detection
            // if (lowercaseContent.length > 1500) {
            //     msg.reply(":exclamation: :octagonal_sign: woah calm down there Mr D'Cruze :octagonal_sign: :exclamation:");
            // }
        }
    }
}
