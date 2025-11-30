import { SlashCommandBuilder } from "discord.js";
import { listPlayers } from "../utils/pebbleAPI.js";

export default {
  data: new SlashCommandBuilder()
    .setName("list_players")
    .setDescription("List players currently online"),

  async execute(interaction) {
    await interaction.deferReply();

    const players = await listPlayers();

    if (!players || players.length === 0)
      return interaction.editReply("👤 No players online.");

    await interaction.editReply("🟢 Online Players:\n" + players.join("\n"));
  }
};
