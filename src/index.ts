import { Client, GatewayIntentBits, EmbedBuilder, TextChannel, ChannelType } from 'discord.js';
import 'dotenv/config';
import { WebsiteMonitor } from './WebsiteMonitor';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
  // Find the #updates channel
  const updatesChannel = client.channels.cache.find(
    (channel): channel is TextChannel => channel.type === ChannelType.GuildText && channel.name === 'updates'
  ) as TextChannel | undefined;

  if (updatesChannel) {
    const monitor = new WebsiteMonitor('https://timetable.unsw.edu.au/2024/SENG3011.html', updatesChannel);

    // Check for changes every hour
    setInterval(() => monitor.checkForChanges(), 3600000); // 3600000 ms = 1 hour
  } else {
    console.log('Updates channel not found');
  }
});

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
