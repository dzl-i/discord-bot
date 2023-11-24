import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import 'dotenv/config';

const commands = [
  {
    name: 'help',
    description: 'Displays a list of available commands',
  },
  // ... other command definitions
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN || '');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.APPLICATION_ID || '', process.env.SERVER_ID || ''),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
