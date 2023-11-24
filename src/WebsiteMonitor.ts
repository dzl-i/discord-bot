import axios from 'axios';
import * as crypto from 'crypto';
import { TextChannel } from 'discord.js';

export class WebsiteMonitor {
  private lastHash: string = '';
  private url: string;
  private channel: TextChannel;

  constructor(url: string, channel: TextChannel) {
    this.url = url;
    this.channel = channel;
  }

  private async fetchWebsiteContentHash(): Promise<string> {
    const response = await axios.get(this.url);
    const content = response.data;
    return crypto.createHash('md5').update(content).digest('hex');
  }

  public async checkForChanges(): Promise<void> {
    const currentHash = await this.fetchWebsiteContentHash();
    if (this.lastHash && currentHash !== this.lastHash) {
      // Detected a change
      const embed = {
        color: 0x0099FF,
        title: 'SENG3011 Timetable',
        url: this.url,
      };

      // Send message to the channel
      await this.channel.send({ content: '@everyone SENG3011 Timetable has changed.', embeds: [embed] });
      console.log(`A change has occured as of ${new Date().toDateString()}.`);
    } else {
      console.log(`No changes made as of ${new Date().toUTCString()}.`);
    }
    this.lastHash = currentHash;
  }
}
