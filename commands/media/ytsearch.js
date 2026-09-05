import yts from 'yt-search';

export default {
  name: 'ytsearch',
  description: 'Search YouTube',
  category: 'media',
  aliases: ['yts', 'searchyt'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');

    if (!query) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🔍 YT SEARCH 〕━━━┈⊷
┃ Usage: ${prefix}ytsearch <query>
┃ 
┃ Example: ${prefix}ytsearch vampire music
┃ 🧛 "The darkness searches."
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

      let results = `╭━━━〔 🔍 YT SEARCH: ${query} 〕━━━┈⊷\n`;
      const videos = searchResults.videos.slice(0, 5);

      videos.forEach((video, index) => {
        results += `┃ ${index + 1}. ${video.title}\n`;
        results += `┃    ⏱️ ${video.duration || 'Live'} | 👤 ${video.author.name || 'Unknown'}\n`;
        results += `┃    🔗 https://youtube.com/watch?v=${video.videoId}\n\n`;
      });

      results += `┃ 📊 ${videos.length} results\n`;
      results += `┃ 🧛 "The darkness finds."
╰━━━━━━━━━━━━━━━┈⊷`;

      await sock.sendMessage(chatId, { text: results }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
