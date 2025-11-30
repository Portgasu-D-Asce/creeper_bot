const { SlashCommandBuilder } = require('discord.js');
const { pebbleServerStatus } = require('../utils/pebbleAPI');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Check the server status')
    .setDMPermission(false),

  async execute(interaction) {
    await interaction.reply('⏳ Checking server status...');

    try {
      const status = await pebbleServerStatus();

      return interaction.editReply(
        `📡 **Server Status:** ${status.status}\n` +
        `🟢 **Online Players:** ${status.playersOnline}`
      );
    } catch (err) {
      return interaction.editReply('❌ Error fetching server status.');
    }
  },
};
