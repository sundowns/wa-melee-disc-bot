var Client = {}
var Sinbin_role = {}
var Admin_role = {}
var Servers = {};

function findAdminRole(role) {
    return role.name == "Admin";
}

function findSinnerRole(role) {
    return role.name == "Naughty";
}

module.exports = {
    Init : function(discord_client) {
        Client = discord_client;
        Client.guilds.forEach(function(guild) {
            var adminRole = guild.roles.find(findAdminRole);
            if (!adminRole) { console.log("Failed to find admin role for guild: " + guild.name); }
            var sinnerRole = guild.roles.find(findSinnerRole);
            if (!sinnerRole) { console.log("Failed to find naughty role for guild: " + guild.name); }
            if (adminRole && sinnerRole) {
                Servers[guild.id] = {"admin" : adminRole, "sinner" : sinnerRole};
            }
        })
        //iterate over guilds
    },
    MessageHandler : function(lowercaseContent, msg) {
        //ignore message if not sent by an admin
        var serverInfo = Servers[msg.guild.id];
        if (msg.member.roles.has(serverInfo.admin.id)) {
            var mentionedUser = msg.mentions.members.first;

            if (lowercaseContent.startsWith(".naughty")) {
                //TODO: FIX THIS. LENGTH from member mentions is undefined!
                if (msg.mentions.members && msg.mentions.members.length != 1) {
                    msg.reply("Invalid usage. You must @mention exactly one user " + msg.mentions.members.length);
                    return;
                }
                if (!mentionedUser.roles.has(serverInfo.sinner.id)) {
                    mentionedUser.addRole(serverInfo.sinner);
                    msg.channel.send("You've been very naughty " + mentionedUser);
                } else {
                    msg.reply("There's only so naughty one person can be");
                }
            }

            if (lowercaseContent.startsWith(".forgive")) {
                if (msg.mentions.members && msg.mentions.members.length != 1) {
                    msg.reply("Invalid usage. You must @mention exactly one user");
                    return;
                }
                if (mentionedUser.roles.has(serverInfo.sinner.id)) {
                    mentionedUser.removeRole(serverInfo.sinner);
                    msg.channel.send("Enjoy your freedom while it lasts " + mentionedUser);
                } else {
                    msg.reply("There's no naughty boy/girl by such a name");
                }
            }
        }

        if (msg.member.roles.has(serverInfo.sinner.id)) {
            console.log("sinner " + msg.member.name + " said summin");
            //sinner said something, delete if they havent been mentioned since
        }
            //Handle messages from normies



    }
}
