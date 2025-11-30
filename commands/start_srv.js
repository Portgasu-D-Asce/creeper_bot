import { SlashCommandBuilder } from "discord.js";
import { startServer } from "../utils/pebbleApi.js";

export default {
  data: new SlashCommandBuilder()
    .setName("start_srv")
    .setDescription("Start the Minecraft server"),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });

    const ok = await startServer();
    if (!ok) return interaction.editReply("⚠️ Failed to send start signal.");

    return interaction.editReply("🟢 Server start signal sent!");
  }
};
