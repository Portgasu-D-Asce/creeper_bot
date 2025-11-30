import { SlashCommandBuilder } from "discord.js";
import { getStatus } from "../utils/pebbleApi.js";

export default {
  data: new SlashCommandBuilder()
    .setName("status_srv")
    .setDescription("Check server status"),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });

    const status = await getStatus();

    if (!status) return interaction.editReply("⚠️ Failed to fetch status.");

    return interaction.editReply(`📡 Server Status: **${status.toUpperCase()}**`);
  }
};
