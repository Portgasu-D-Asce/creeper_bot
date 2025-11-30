import { startServer } from "../utils/pebble.js";

export default {
  name: "start_srv",
  description: "Start the Minecraft server",

  async execute(interaction) {
    const adminRole = "1389189571568341014";

    if (!interaction.member.roles.cache.has(adminRole)) {
      return interaction.reply({
        content: "❌ You don't have permission to start the server.",
        ephemeral: true
      });
    }

    await interaction.reply("🟡 Starting the server...");
    await startServer();

    return interaction.followUp("🟢 Server start signal sent!");
  }
};
