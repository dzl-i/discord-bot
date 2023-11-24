import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'help') {
    const helpEmbed = new EmbedBuilder()
      .setColor(0x0099FF) // Set the color of the embed
      .setTitle('Help') // Set the title of the embed
      .setDescription('List of available commands:') // Set the description
      .addFields(
        { name: '/help', value: 'Shows a list of available commands and their descriptions.' },
        // Add more fields with name as command and value as description
        // Example:
        // { name: '/anothercommand', value: 'Description of another command.' }
      )

    await interaction.reply({ embeds: [helpEmbed] });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
