const Discord = require("discord.js");
const bot = new Discord.Client({ intents: 53608447 });
const config = require("./config.js");
const { EmbedBuilder } = require("@discordjs/builders");

bot.login(config.token);

bot.once("ready", () => {
  console.log(`${bot.user.tag} est bien en ligne`);
});

bot.on("messageCreate", (message) => {
  if (message.content === "!ping") {
    message.channel.send("Pong!");
  }

  if (message.content.startsWith("!avatar")) {
    const username = message.content.split(" ")[1];
    const user = message.guild.members.cache.find(
      (member) => member.user.username === username,
    )?.user;

    if (user) {
      const embed = new EmbedBuilder()
        .setTitle(`${user.username}`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor(0x5b209a)
        .setDescription(`Voici l'avatar de ${user.username}`)

      message.channel.send({ embeds: [embed] });
    } else {
      message.channel.send("Erreur");
    }
  }
});
