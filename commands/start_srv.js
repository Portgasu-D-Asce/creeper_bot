import { SlashCommandBuilder } from "discord.js";
import { startServer } from "../utils/pebbleAPI.js";

export default {
  data: new SlashCommandBuilder()
    .setName("start_srv")
    .setDescription("Starts the Minecraft server"),

  async execute(interaction) {
    await interaction.deferReply();

    const result = await startServer();
    return interaction.editReply(result);
  }
};
