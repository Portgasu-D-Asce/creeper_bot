const { SlashCommandBuilder } = require('discord.js');
const { pebbleStartServer } = require('../utils/pebbleAPI');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start_srv')
    .setDescription('Start the Minecraft server')
    .setDMPermission(false),

  async execute(interaction) {
    await interaction.reply({ content: 'Checking permissions...', ephemeral: true });

    const allowedRole = process.env.MINECRAFT_ROLE_ID;
    if (!interaction.member.roles.cache.has(allowedRole)) {
      return interaction.editReply('❌ You don’t have permission to start the server.');
    }

    interaction.editReply('🟡 Starting server…');

    try {
      const result = await pebbleStartServer();
      if (result.success) {
        return interaction.editReply('🟢 **Server is now starting!** It may take 2–5 minutes.');
      } else {
        return interaction.editReply('❌ Failed to start server: `' + result.message + '`');
      }
    } catch (err) {
      return interaction.editReply('❌ Error starting server.');
    }
  },
};
