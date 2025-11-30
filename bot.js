import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import fetch from "node-fetch";

const TOKEN = process.env.DISCORD_TOKEN;
const APP_ID = process.env.DISCORD_APP_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const PEBBLE_API_KEY = process.env.PEBBLE_API_KEY;
const PEBBLE_SERVER_ID = process.env.PEBBLE_SERVER_ID;

if (!TOKEN || !APP_ID || !GUILD_ID || !PEBBLE_API_KEY || !PEBBLE_SERVER_ID) {
  console.error("Missing required env vars.");
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function registerCommands() {
  const commands = [
    { name: "start_srv", description: "Start the Minecraft server" }
  ];

  const rest = new REST({ version: "10" }).setToken(TOKEN);
  await rest.put(
    Routes.applicationGuildCommands(APP_ID, GUILD_ID),
    { body: commands }
  );

  console.log("Slash command registered.");
}

client.once("ready", () => {
  console.log(`Bot ready: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "start_srv") {
    await interaction.reply("🟡 Starting server…");

    const resp = await fetch(
      `https://api.pebblehost.com/v2/server/${PEBBLE_SERVER_ID}/power`,
      {
        method: "POST",
        headers: {
          "Authorization": PEBBLE_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ signal: "start" })
      }
    );

    if (resp.ok) {
      await interaction.followUp("🟢 Server starting!");
    } else {
      await interaction.followUp("🔴 Failed to start server.");
    }
  }
});

await registerCommands();
client.login(TOKEN);
