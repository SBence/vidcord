import ytdl from "@distube/ytdl-core";
import { EmbedBuilder, TextChannel } from "discord.js";
import secondsToHMS from "./utils/sendVideoInfo/secondsToHMS.js";
import ytdlDateToHumanReadable from "./utils/sendVideoInfo/ytdlDateToHumanReadable.js";

export default async function sendVideoInfo(
  videoURLs: string[],
  sendToChannel: TextChannel,
) {
  for (const videoURL of videoURLs) {
    const details = (await ytdl.getBasicInfo(videoURL)).videoDetails;

    const ytEmbed = new EmbedBuilder()
      .setTitle(details.title)
      .setURL(videoURL)
      .setAuthor({
        name: details.ownerChannelName,
        url: details.author.channel_url,
        iconURL:
          details.author.thumbnails?.[details.author.thumbnails.length - 1]
            ?.url,
      })
      .setThumbnail(details.thumbnails[details.thumbnails.length - 2]?.url)
      .setColor("#ff0000");

    if (details.lengthSeconds !== "0") {
      ytEmbed.addFields({
        name: "⏱️ Length",
        value: secondsToHMS(details.lengthSeconds),
        inline: true,
      });
    }

    ytEmbed.addFields(
      {
        name: "👁️ Views",
        value: parseInt(details.viewCount).toLocaleString("fr-FR"),
        inline: true,
      },
      {
        name: "📤 Uploaded",
        value: ytdlDateToHumanReadable(details.uploadDate),
        inline: true,
      },
    );

    if (details.uploadDate !== details.publishDate)
      ytEmbed.addFields({
        name: "📢 Published",
        value: ytdlDateToHumanReadable(details.publishDate),
        inline: true,
      });

    if (details.media.song) {
      const artist = details.media.artist;
      ytEmbed.addFields({
        name: "🔊 Audio",
        value: artist
          ? `${artist} - ${details.media.song}`
          : details.media.song,
        inline: true,
      });
    }

    if (details.media.game)
      ytEmbed.addFields({
        name: "🎮 Game",
        value: details.media.game,
        inline: true,
      });

    if (details.chapters.length) {
      let chapterIndex = 1;
      let chaptersString = "";
      const chapterCountDigits =
        (Math.log(details.chapters.length) * Math.LOG10E + 1) | 0;

      for (const chapter of details.chapters) {
        chaptersString = chaptersString.concat(
          `\`${chapterIndex.toString().padStart(chapterCountDigits, " ")}.\` ${
            chapter.title
          }\n`,
        );
        chapterIndex += 1;
      }

      ytEmbed.addFields({
        name: "🎬 Chapters",
        value: chaptersString,
      });
    }

    await sendToChannel.send({ embeds: [ytEmbed] });
  }
}
