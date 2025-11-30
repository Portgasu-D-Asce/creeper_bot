import { SlashCommandBuilder } from "discord.js";
import { getStatus } from "../utils/pebbleAPI.js";

export default {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Get server status"),

  async execute(interaction) {
    await interaction.deferReply();
    const msg = await getStatus();
    await interaction.editReply(msg);
  }
};
