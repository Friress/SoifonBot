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
        .setDescription(`Voici l'avatar de ${user.username}`);

      message.channel.send({ embeds: [embed] });
    } else {
      message.channel.send("Erreur");
    }
  }
});

bot.on("messageCreate", async (message) => {
  if (!message.content.startsWith("!")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ban" || command === "kick") {
    // Check if the user has the required permissions
    if (!message.member.permissions.has(["BAN_MEMBERS", "KICK_MEMBERS"])) {
      return message.reply(
        "Vous n'avez pas les permissions pour utiliser cette comande.",
      );
    }

    // Check if a user is mentioned
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("Veuillez mentionner un utilisateur.");
    }

    try {
      // Ban or kick the mentioned user
      if (command === "ban") {
        await message.guild.members.ban(user.id);
        message.reply(`${user.tag} a été banni.`);
      } else if (command === "kick") {
        await message.guild.members.kick(user.id);
        message.reply(`${user.tag} a été kick.`);
      }
    } catch (error) {
      console.error(error);
      message.reply(`Il y'a eu un problème dans la commande.`);
    }
  }
});
