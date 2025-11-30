import { SlashCommandBuilder } from "discord.js";
import { stopServer } from "../utils/pebbleAPI.js";

export default {
  data: new SlashCommandBuilder()
    .setName("stop_srv")
    .setDescription("Stop the Minecraft server"),

  async execute(interaction) {
    await interaction.deferReply();
    const msg = await stopServer();
    await interaction.editReply(msg);
  }
};
