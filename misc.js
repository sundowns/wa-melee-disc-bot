const prefix = ".";

module.exports = {
  MessageHandler: function (lowercaseContent, msg) {
    if (
      lowercaseContent === prefix + "pr" ||
      lowercaseContent === prefix + "prs"
    ) {
      msg.reply("\n https://i.imgur.com/ui33zag.jpg");
    } else if (lowercaseContent.startsWith(prefix + "f")) {
      var result = msg.content.match(/\.f (.+)/);
      if (result) {
        msg.channel
          .send(`Press 🇫 to pay respects to ${result[1]}`)
          .then((message) => message.react("🇫"));
      } else if (lowercaseContent === ".f") {
        msg.channel
          .send("Press 🇫 to pay respects")
          .then((message) => message.react("🇫"));
      }
    } else if (lowercaseContent === prefix + "rule1") {
      msg.reply("\n http://imgur.com/a/NsNqI");
    }
  },
};
