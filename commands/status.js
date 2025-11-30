import { SlashCommandBuilder } from "discord.js";
import { getServerStatus } from "../utils/pebbleAPI.js";

export default {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Checks Minecraft server status"),

  async execute(interaction) {
    await interaction.deferReply();

    const status = await getServerStatus();
    return interaction.editReply(status);
  }
};
