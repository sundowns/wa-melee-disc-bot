var Client = {}
var Sinbin_role = {}
var Admin_role = {}
var Servers = {};
var Emojis = {};

function findAdminRole(role) {
    return role.name == "Admin";
}

function findSinnerRole(role) {
    return role.name == "Naughty";
}

function findPaddlingEmoji(emoji) {
    return emoji.name == "paddlin";
}

function findWAMeleeServer(server) {
    return server.id == "336001917304045569";
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
                Servers[guild.id] = {"admin" : adminRole, "sinner" : sinnerRole, "userMentioned" : false, "naughtyPerson" : null};
            }
        })
        Emojis["paddlin"] = Client.guilds.find(findWAMeleeServer).emojis.find(findPaddlingEmoji);
    },
    MessageHandler : function(lowercaseContent, msg) {
        var serverInfo = Servers[msg.guild.id];
        if (msg.member.roles.has(serverInfo.admin.id)) {
            var mentionedUser = msg.mentions.members.first();

            if (lowercaseContent.startsWith(".naughty")) {
                if (!msg.mentions.members || !mentionedUser) {
                    msg.reply("Invalid usage. You must @mention exactly one user");
                    return;
                }
                if (serverInfo.naughtyPerson != null) {
                    msg.reply("There's only room for one in the naughty corner");
                } else {
                    if (mentionedUser && !mentionedUser.roles.has(serverInfo.sinner.id)) {
                        mentionedUser.addRole(serverInfo.sinner);
                        Servers[msg.guild.id].naughtyPerson = mentionedUser;
                        msg.channel.send("You've been very naughty " + mentionedUser + " " + Emojis["paddlin"]);
                    } else {
                        msg.reply("There's only so naughty one person can be");
                    }
                }
            }

            if (lowercaseContent.startsWith(".forgive")) {
                if (!msg.mentions.members || !mentionedUser) {
                    msg.reply("Invalid usage. You must @mention exactly one user");
                    return;
                }
                if (mentionedUser && mentionedUser.roles.has(serverInfo.sinner.id)) {
                    mentionedUser.removeRole(serverInfo.sinner);
                    Servers[msg.guild.id].naughtyPerson = null;
                    msg.channel.send("Enjoy your freedom while it lasts " + mentionedUser);
                } else {
                    msg.reply("There's no naughty nuisance by such a name");
                }
            }
        }

        if (msg.member.roles.has(serverInfo.sinner.id)) {
            if (serverInfo.userMentioned) {
                msg.react(Emojis["paddlin"].id);
                Servers[msg.guild.id].userMentioned = false;
            } else {
                msg.reply("Naughty people speak only when spoken to " + Emojis["paddlin"]);
                msg.delete();
            }
        } else {
            if (serverInfo.naughtyPerson && msg.isMemberMentioned(serverInfo.naughtyPerson) && !lowercaseContent.startsWith(".")) {
                Servers[msg.guild.id].userMentioned = true;
            }
        }
    }
}
