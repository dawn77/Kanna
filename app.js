require("dotenv").config();

const discord = require("discord.js");
const client = new discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

//* MongoDB

const mongoose = require("mongoose");
const mg = process.env["DB"];

mongoose
.connect(mg, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("---------------------- MONGODB ----------------------")
  console.log("\nConectado a MongoDB")
  console.log("\n---------------------- CONSOLA ----------------------")
})
.catch((e) => {
  console.log(e)
})

//* MongoDB



//! CODIGO

client.commands = new discord.Collection();
client.events = new discord.Collection();

["commandHandler", "eventHandler"].forEach((file) => {
  require(`./handlers/${file}`)(client, discord);
});
//!------

client.login(process.env.DSTOKEN);