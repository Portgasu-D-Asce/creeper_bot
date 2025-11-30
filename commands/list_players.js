const { SlashCommandBuilder } = require('discord.js');
const { pebbleListPlayers } = require('../utils/pebbleAPI');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list_players')
    .setDescription('Show the list of online players')
    .setDMPermission(false),

  async execute(interaction) {
    await interaction.reply('🔍 Fetching online players...');

    try {
      const players = await pebbleListPlayers();

      if (!players || players.length === 0) {
        return interaction.editReply('👤 No players are currently online.');
      }

      return interaction.editReply('🟢 **Online Players:**\n' + players.join('\n'));
    } catch (err) {
      return interaction.editReply('❌ Failed to fetch players.');
    }
  },
};
