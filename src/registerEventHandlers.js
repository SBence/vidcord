import sendVideoInfo from "./events/sendVideoInfo.js";
import updatePresence from "./events/updatePresence.js";

const videoURLRegex =
  /https?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([a-zA-Z0-9-_]{11})(&(amp;)?[\w?=]*)?/g;

export default function registerEventHandlers(client) {
  client.once("ready", async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    await updatePresence(client);
  });

  client.on("guildCreate", async () => {
    await updatePresence(client);
  });

  client.on("guildDelete", async () => {
    await updatePresence(client);
  });

  client.on("messageCreate", async (message) => {
    if (
      message.channel.type !== "GUILD_TEXT" ||
      message.author.bot ||
      !message.guild.available ||
      !message.channel
        .permissionsFor(client.user)
        .has(["SEND_MESSAGES", "EMBED_LINKS"])
    )
      return;

    const videoURLs = message.content.match(videoURLRegex);
    if (videoURLs) await sendVideoInfo(videoURLs, message.channel);
  });
}
