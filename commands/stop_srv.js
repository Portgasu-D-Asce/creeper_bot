import { SlashCommandBuilder } from "discord.js";
import { stopServer } from "../utils/pebbleAPI.js";

export default {
  data: new SlashCommandBuilder()
    .setName("stop_srv")
    .setDescription("Stops the Minecraft server"),

  async execute(interaction) {
    await interaction.deferReply();

    const result = await stopServer();
    return interaction.editReply(result);
  }
};
