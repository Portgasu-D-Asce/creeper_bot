import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import {
  Client,
  GatewayIntentBits,
  Collection,
  REST,
  Routes
} from "discord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ENV VARS
const TOKEN = process.env.BOT_TOKEN;
const APP_ID = process.env.APPLICATION_ID;
const GUILD_ID = process.env.GUILD_ID;

// DISCORD CLIENT
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// LOAD COMMAND FILES
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath)
  .filter(file => file.endsWith(".js"));

const slashCommandsJSON = [];

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = (await import(filePath)).default;

  client.commands.set(command.data.name, command);
  slashCommandsJSON.push(command.data.toJSON());
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// HANDLE COMMANDS
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply("❌ Command failed.");
  }
});

// REGISTER SLASH COMMANDS
const rest = new REST({ version: "10" }).setToken(TOKEN);

try {
  console.log("Registering slash commands...");
  await rest.put(
    Routes.applicationGuildCommands(APP_ID, GUILD_ID),
    { body: slashCommandsJSON }
  );
  console.log("Slash commands registered!");
} catch (error) {
  console.error("Error registering commands:", error);
}

client.login(TOKEN);

// FAKE WEB SERVER FOR RENDER
const app = express();
app.get("/", (req, res) => res.send("Bot Running"));
app.listen(process.env.PORT || 3000, () =>
  console.log("Express keepalive server running.")
);
