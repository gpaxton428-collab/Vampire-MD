import yts from 'yt-search';

export default {
  name: 'play',
  description: 'Play music from YouTube',
  category: 'media',
  aliases: ['yt', 'music'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');

    if (!query) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🎵 PLAY 〕━━━┈⊷
┃ Usage: ${prefix}play <song name>
┃ 
┃ Example: ${prefix}play Rick Astley
┃ 🧛 "The darkness plays."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    await sock.sendMessage(chatId, { text: '⏳ Searching...' }, { quoted: msg });

    try {
      const searchResults = await yts(query);

      if (!searchResults || !searchResults.videos || searchResults.videos.length === 0) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ No results found!
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      const video = searchResults.videos[0];

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🎵 NOW PLAYING 〕━━━┈⊷
┃ 📌 ${video.title}
┃ ⏱️ Duration: ${video.duration || 'Unknown'}
┃ 👤 Uploader: ${video.author.name || 'Unknown'}
┃ 🔗 https://youtube.com/watch?v=${video.videoId}
┃ 🧛 "The darkness plays."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
