import { ChannelType, Events, PermissionsBitField } from "discord.js";
import sendVideoInfo from "./events/sendVideoInfo.js";
import updatePresence from "./events/updatePresence.js";

const videoURLRegex =
  /https?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([a-zA-Z0-9-_]{11})(&(amp;)?[\w?=]*)?/g;

export default function registerEventHandlers(client) {
  client.once(Events.ClientReady, async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    await updatePresence(client);
  });

  client.on(Events.GuildCreate, async () => {
    await updatePresence(client);
  });

  client.on(Events.GuildDelete, async () => {
    await updatePresence(client);
  });

  client.on(Events.MessageCreate, async (message) => {
    if (
      message.channel.type !== ChannelType.GuildText ||
      message.author.bot ||
      !message.guild.available ||
      !message.channel
        .permissionsFor(client.user)
        .has([
          PermissionsBitField.Flags.SendMessages,
          PermissionsBitField.Flags.EmbedLinks,
        ])
    )
      return;
    const videoURLs = message.content.match(videoURLRegex);
    if (videoURLs) await sendVideoInfo(videoURLs, message.channel);
  });
}
