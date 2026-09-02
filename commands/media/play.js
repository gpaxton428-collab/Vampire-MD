export default {
  name: 'play',
  description: 'Search and play music from YouTube',
  category: 'media',
  aliases: ['song', 'music'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');

    if (!query) {
      await sock.sendMessage(chatId, {
        text: `❌ Please provide a song name!\n\nExample: ${prefix}play Rick Astley - Never Gonna Give You Up`
      }, { quoted: msg });
      return;
    }

    try {
      await sock.sendMessage(chatId, { text: '⏳ Searching for your song...' }, { quoted: msg });

      const searchResponse = await fetch(`https://apix.wolvarex.com/api/music/ytmp3-search?q=${encodeURIComponent(query)}&key=wxa_d_test`);
      const searchData = await searchResponse.json();

      if (!searchData.success || !searchData.result || searchData.result.length === 0) {
        await sock.sendMessage(chatId, { text: '❌ No results found for your search.' }, { quoted: msg });
        return;
      }

      const song = searchData.result[0];
      const songTitle = song.title || song.name || 'Unknown Title';
      const songId = song.id || song.videoId;

      if (!songId) {
        await sock.sendMessage(chatId, { text: '❌ Could not retrieve song ID. Please try again.' }, { quoted: msg });
        return;
      }

      const downloadResponse = await fetch(`https://apix.wolvarex.com/api/music/ytmp3-download?id=${songId}&key=wxa_d_test`);
      const downloadData = await downloadResponse.json();

      if (downloadData.success && downloadData.result) {
        const audioUrl = downloadData.result.url || downloadData.result.download || downloadData.result.audio;

        if (audioUrl) {
          await sock.sendMessage(chatId, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            caption: `🎵 *Now Playing*\n\n📌 Title: ${songTitle}\n\n> Powered by Apix`
          }, { quoted: msg });
        } else {
          await sock.sendMessage(chatId, {
            text: `🎵 *${songTitle}*\n\n${downloadData.result.url || 'Download link not available'}\n\n> Powered by Apix`
          }, { quoted: msg });
        }
      } else {
        await sock.sendMessage(chatId, {
          text: `❌ Failed to download the song. Please try again.\n\n🎵 *${songTitle}*`
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `❌ Error: ${error.message}`
      }, { quoted: msg });
    }
  }
};
