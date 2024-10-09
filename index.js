const Discord = require("discord.js")
const bot = new Discord.Client({intents: 53608447})
const config = require("./config.js")

bot.login(config.token)

bot.once("ready", () => {
    console.log(`${bot.user.tag} est bien en ligne`)
})

bot.on("messageCreate", (message) => {
    if (message.content === "!ping") {
        message.channel.send("Pong!");
    }
})