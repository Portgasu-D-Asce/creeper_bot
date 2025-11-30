import { SlashCommandBuilder } from "discord.js";
import { getPlayerList } from "../utils/pebbleAPI.js";

export default {
  data: new SlashCommandBuilder()
    .setName("list_players")
    .setDescription("Shows currently online players"),
  
  async execute(interaction) {
    await interaction.deferReply();

    const players = await getPlayerList();

    if (!players || players.length === 0) {
      return interaction.editReply("No players are currently online.");
    }

    const names = players.map(p => `• ${p}`).join("\n");
    return interaction.editReply(`**Online Players:**\n${names}`);
  }
};
