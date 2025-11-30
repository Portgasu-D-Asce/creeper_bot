const { SlashCommandBuilder } = require('discord.js');
const { pebbleStopServer } = require('../utils/pebbleAPI');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop_srv')
    .setDescription('Stop the Minecraft server')
    .setDMPermission(false),

  async execute(interaction) {
    await interaction.reply({ content: 'Checking permissions...', ephemeral: true });

    const allowedRole = process.env.MINECRAFT_ROLE_ID;
    if (!interaction.member.roles.cache.has(allowedRole)) {
      return interaction.editReply('❌ You don’t have permission to stop the server.');
    }

    interaction.editReply('🟡 Stopping server…');

    try {
      const result = await pebbleStopServer();
      if (result.success) {
        return interaction.editReply('🔴 **Server is stopping!**');
      } else {
        return interaction.editReply('❌ Failed to stop server: `' + result.message + '`');
      }
    } catch (err) {
      return interaction.editReply('❌ Error stopping server.');
    }
  },
};
