import { stopServer } from "../utils/pebble.js";

export default {
  name: "stop_srv",
  description: "Stop the Minecraft server",

  async execute(interaction) {
    const adminRole = "1389189571568341014";

    if (!interaction.member.roles.cache.has(adminRole)) {
      return interaction.reply({
        content: "❌ You don't have permission to stop the server.",
        ephemeral: true
      });
    }

    await interaction.reply("🔴 Stopping server...");
    await stopServer();

    return interaction.followUp("🛑 Server stop signal sent!");
  }
};
