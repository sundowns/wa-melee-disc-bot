const request = require('request-json');
const twitchClientId = '1or2tbd8kb5jeqz3kokr754kb4svid';
const twitchEndPoint = 'https://api.twitch.tv/kraken/'
const streams = [
    'striderace21',
    'quetzalcoatl87',
    'sunnydowns',
    'perthsmash',
    'curtinsmash',
    'chappos',
    'melbournemelee',
    'mrnoied'
];

const gameQueryParameter = '&game=Super%20Smash%20Bros.%20Melee';
var live = [];
var discordClient = {};
var requestClient = {};

//emotes
var supersonic = {};

function findWaMeleeGuild(guild) {
    return guild.id == "336001917304045569";
}

function findStreamsChannel(channel) {
    return channel.id == "337881711436234752"; // streams channel = '337881711436234752' //dumb bot shit = '336087767387865089'
}

function findSuperSonic(emoji){
    return emoji.name == "supersonic";
}

function reportNewStreams(newStreams) {
    var channel = discordClient.channels.find(findStreamsChannel);
    var msg = "";
    newStreams.forEach(function(id) {
        var stream = live[id];
        msg = msg + stream.title + " (" + stream.game + ")\n" + stream.link + "\nViewers: " + stream.viewers;
        msg = msg + "\n*======*\n";
    });
    channel.send("**Now Live:** \n*======*\n" + msg + "\n" + supersonic + supersonic + supersonic + supersonic);
}

function reportAllStreams(promptMsg) {
    var msg = "";
    streams.forEach(function(name) {
        if (live[name]) {
            var stream = live[name]
            msg = msg + stream.title + " (" + stream.game + ")\n" + stream.link + "\nViewers: " + stream.viewers;
            msg = msg + "\n*======*\n";
        }
    })
    promptMsg.reply("\n**Live:** \n*======*\n" + msg + "\n" + "Perth Tournament Streams: \n" + "\n https://www.twitch.tv/perthsmash \n https://www.smashcast.tv/perthsmash");
}

var checkStreams = function() {
    var streamsDelimited = streams.join();
    requestClient.get('streams/?channel=' + streamsDelimited + gameQueryParameter, function(err, res, body) {
        if (err) {
            return console.log(err);
        }
        latestStreams = body.streams;
        if (body._total > 0) {
            var newStreams = [];
            body.streams.forEach(function(data) {
                if (!live[data.channel.display_name]) {
                    live[data.channel.display_name] = {
                        title : data.channel.status,
                        viewers : data.viewers,
                        game : data.game,
                        link : data.channel.url,
                        img : data.preview.medium
                    }

                    newStreams.push(data.channel.display_name);
                } else {
                    //it already exists, just update the title/viewers
                    live[data.channel.display_name].title = data.channel.status;
                    live[data.channel.display_name].viewers = data.viewers;
                }
            });

            if (newStreams.length > 0) {
                reportNewStreams(newStreams);
            }
        } else {
            live = [];
        }
    });
}

module.exports = {
    Init : function(discord_client) {
        discordClient = discord_client;
        requestClient = request.createClient(twitchEndPoint);
        requestClient.headers['Client-ID'] = twitchClientId;
        var WaMelee = discord_client.guilds.find(findWaMeleeGuild);
        supersonic = WaMelee.emojis.find(findSuperSonic);
        checkStreams();
    },
    MessageHandler : function(lowercaseContent, msg) {
        if (lowercaseContent === '.streams' || lowercaseContent === '.stream') reportAllStreams(msg);
    }
}

setInterval(function() {
    checkStreams();
}, 1 * 60 * 1000); //every 1 minutes
