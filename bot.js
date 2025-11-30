import { Client, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express"; // Fake server for Render

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ENV Vars
const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.APPLICATION_ID;
const GUILD_ID = process.env.GUILD_ID;

// Create Discord Client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.commands = new Collection();

// Load Commands
const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.name, command.default);

  commands.push({
    name: command.default.name,
    description: command.default.description
  });
}

// Register Commands on Discord
const rest = new REST({ version: "10" }).setToken(TOKEN);

async function registerCommands() {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("Slash commands registered.");
  } catch (err) {
    console.error("Error registering commands:", err);
  }
}

// Bot Ready Event
client.on("ready", () => {
  console.log(`Bot logged in as ${client.user.tag}`);
  registerCommands();
});

// Slash Command Handler
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "❌ Internal error.",
      ephemeral: true
    });
  }
});

// Fake web server (required for Render free tier)
const app = express();
app.get("/", (req, res) => res.send("Bot is running OK."));
app.listen(process.env.PORT || 3000, () => {
  console.log("Fake web server started.");
});

// Login
client.login(TOKEN);
