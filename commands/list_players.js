import { listOnlinePlayers } from "../utils/pebble.js";

export default {
  name: "list_players",
  description: "Show players currently online",

  async execute(interaction) {
    const data = await listOnlinePlayers();
    const players = data?.players || [];

    if (players.length === 0)
      return interaction.reply("👥 No players online.");

    return interaction.reply("👥 Online Players:\n" + players.join("\n"));
  }
};
