import { SlashCommandBuilder } from "discord.js";
import { startServer } from "../utils/pebbleAPI.js";

export default {
  data: new SlashCommandBuilder()
    .setName("start_srv")
    .setDescription("Start the Minecraft server"),

  async execute(interaction) {
    await interaction.deferReply();
    const msg = await startServer();
    await interaction.editReply(msg);
  }
};
