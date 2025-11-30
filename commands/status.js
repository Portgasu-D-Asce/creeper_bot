import { getStatus } from "../utils/pebble.js";

export default {
  name: "status",
  description: "Check the server status",

  async execute(interaction) {
    await interaction.reply("⏳ Checking server status...");

    const data = await getStatus();
    const state = (data?.status || "unknown").toUpperCase();

    return interaction.followUp(`📡 Server status: **${state}**`);
  }
};
