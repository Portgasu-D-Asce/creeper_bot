import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import express from "express";

const app = express();
app.get("/", (_, res) => res.send("Bot is running"));
app.listen(10000, () => console.log("Express server running."));

const __dirname = path.resolve();

// Environment vars
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_APPLICATION_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

// Load command files
const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath);

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = (await import(`file://${filePath}`)).default;

  if (command?.data) {
    commands.push(command.data.toJSON());
  }
}

// Register commands
const rest = new REST().setToken(TOKEN);

async function registerCommands() {
  try {
    console.log("Registering Discord slash commands...");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    console.log("Slash commands registered.");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
}

client.login(TOKEN).then(() => registerCommands());
