const Discord = require("discord.js");
const { MessageEmbed, Intents } = require("discord.js");
const scrape = require("./scrape");
const fs = require("fs");
const config = require("./config.json")

let queue = false;

const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("The bot is ready");
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(`!chegg`)) {
    let link = message.content.replace("!chegg", "");
    if (!link.includes("https://www.chegg.com/homework-help")) {
      const errorEmbed = new MessageEmbed()
        .setColor("#C91019")
        .setTitle("Error")
        .setDescription("There was an error with your link.")
        .setTimestamp();
      message.channel.send({ embeds: [errorEmbed] }).catch(console.error);
      return;
    } else if (queue === true) {
      const queueEmbed = new MessageEmbed()
        .setColor("#C91019")
        .setTitle("Error")
        .setDescription("Please wait and try again.")
        .setTimestamp();
      message.channel.send({ embeds: [queueEmbed] }).catch(console.error);
    } else {
      queue = true;
      const processEmbed = new MessageEmbed()
        .setColor("#F85B00")
        .setTitle("Processing")
        .setDescription("Your request is being processed...")
        .setTimestamp();

      message.channel.send({ embeds: [processEmbed] }).catch(console.error);

      await scrape(link);

      if (fs.readFileSync("./chegg.html").length === 0) {
        const errorEmbed = new MessageEmbed()
          .setColor("#C91019")
          .setTitle("Error")
          .setDescription("There was an error with your link.")
          .setTimestamp();
        message.channel.send({ embeds: [errorEmbed] }).catch(console.error);
      } else {
        message.author.send("Download to see the answer:");
        await message.author.send({
          files: ["./chegg.html"],
        });
        const successEmbed = new MessageEmbed()
          .setColor("#00F800")
          .setTitle("Success")
          .setDescription("Your request has been processed, check your DMs!")
          .setTimestamp();
        message.channel.send({ embeds: [successEmbed] }).catch(console.error);
      }
    }

    const elem = "";

    fs.writeFile("./chegg.html", elem, (error) => {
      console.log(error);
    });

    queue = false;
  }
});

client.login(config.token);
