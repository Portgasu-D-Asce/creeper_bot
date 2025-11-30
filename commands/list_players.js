import { SlashCommandBuilder } from "discord.js";
import { listPlayers } from "../utils/pebbleApi.js";

export default {
  data: new SlashCommandBuilder()
    .setName("list_players")
    .setDescription("List players currently online"),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });

    const players = await listPlayers();

    if (!players || players.length === 0)
      return interaction.editReply("🟦 No players online.");

    return interaction.editReply("🟩 **Online Players:**\n" + players.join("\n"));
  }
};
