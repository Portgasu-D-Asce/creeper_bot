import { getStatus } from "../utils/pebble.js";

export default {
  name: "status",
  description: "Check server status",

  async execute(interaction) {
    await interaction.reply("⏳ Checking server status...");

    const data = await getStatus();
    const state = data?.status ?? "unknown";

    return interaction.followUp(`📡 Server Status: **${state.toUpperCase()}**`);
  }
};
