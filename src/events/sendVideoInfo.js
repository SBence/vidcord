import { MessageEmbed } from "discord.js";
import ytdl from "ytdl-core";
import secondsToHMS from "./utils/sendVideoInfo/secondsToHMS.js";
import ytdlDateToHumanReadable from "./utils/sendVideoInfo/ytdlDateToHumanReadable.js";

export default async function sendVideoInfo(videoURLs, sendToChannel) {
  for (const videoURL of videoURLs) {
    const details = (await ytdl.getBasicInfo(videoURL)).videoDetails;

    const ytEmbed = new MessageEmbed()
      .setTitle(details.title)
      .setURL(videoURL)
      .setAuthor({
        name: details.ownerChannelName,
        url: details.author.channel_url,
        iconURL:
          details.author.thumbnails[details.author.thumbnails.length - 1].url,
      })
      .setThumbnail(details.thumbnails[details.thumbnails.length - 2].url)
      .setColor("#ff0000");

    if (details.lengthSeconds !== "0")
      ytEmbed.addField("⏱️ Length", secondsToHMS(details.lengthSeconds), true);

    ytEmbed.addField(
      "👁️ Views",
      parseInt(details.viewCount).toLocaleString("fr-FR"),
      true
    );

    ytEmbed.addField(
      "📤 Uploaded",
      ytdlDateToHumanReadable(details.uploadDate),
      true
    );

    if (details.uploadDate !== details.publishDate) {
      ytEmbed.addField(
        "📢 Published",
        ytdlDateToHumanReadable(details.publishDate),
        true
      );
    }

    if (details.media.artist && details.media.song)
      ytEmbed.addField(
        "🔊 Audio",
        `${details.media.artist} - ${details.media.song}`,
        true
      );

    if (details.media.game)
      ytEmbed.addField("🎮 Game", details.media.game, true);

    if (details.chapters.length)
      ytEmbed.addField("🎬 Chapters", details.chapters.length, true);

    sendToChannel.send({ embeds: [ytEmbed] });
  }
}
