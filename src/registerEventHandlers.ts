import { ChannelType, Client, Events, PermissionsBitField } from "discord.js";
import sendVideoInfo from "./events/sendVideoInfo.js";
import updatePresence from "./events/updatePresence.js";

const videoURLRegex =
  /https?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([a-zA-Z0-9-_]{11})(&(amp;)?[\w?=]*)?/g;

export default function registerEventHandlers(client: Client) {
  client.once(Events.ClientReady, async () => {
    if (client.user) {
      console.log(`✅ Logged in as ${client.user.tag}`);
    } else {
      console.log("✅ Logged in");
    }
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
      !client.user ||
      !message.guild ||
      message.channel.type === ChannelType.DM
    )
      return;
    const botPermissionsInChannel = message.channel.permissionsFor(client.user);

    if (!botPermissionsInChannel) return;
    if (
      message.channel.type !== ChannelType.GuildText ||
      message.author.bot ||
      !message.guild.available ||
      !message.content ||
      !botPermissionsInChannel.has([
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.EmbedLinks,
      ])
    )
      return;
    const videoURLs = message.content.match(videoURLRegex);
    if (videoURLs) await sendVideoInfo(videoURLs, message.channel);
  });
}
