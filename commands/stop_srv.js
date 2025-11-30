import { SlashCommandBuilder } from "discord.js";
import { stopServer } from "../utils/pebbleApi.js";

export default {
  data: new SlashCommandBuilder()
    .setName("stop_srv")
    .setDescription("Stop the Minecraft server"),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });

    const ok = await stopServer();
    if (!ok) return interaction.editReply("⚠️ Failed to send stop signal.");

    return interaction.editReply("🔴 Server stopping...");
  }
};
