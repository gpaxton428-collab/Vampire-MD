export default {
  name: 'ytdownload',
  description: 'Download YouTube audio',
  category: 'media',
  aliases: ['ytdl', 'ytmp3'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const url = args[0];

    if (!url) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📥 YT DOWNLOAD 〕━━━┈⊷
┃ Usage: ${prefix}ytdownload <url>
┃ 
┃ Example: ${prefix}ytdownload https://youtube.com/watch?v=xxx
┃ 🧛 "The darkness downloads."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const urlMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (!urlMatch) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Invalid YouTube URL.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const videoId = urlMatch[1];

    await sock.sendMessage(chatId, { text: '⏳ Downloading...' }, { quoted: msg });

    try {
      const apiUrl = `https://api.akuari.my.id/downloader/youtube?link=https://youtube.com/watch?v=${videoId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.result && data.result.audio) {
        await sock.sendMessage(chatId, {
          audio: { url: data.result.audio },
          mimetype: 'audio/mpeg',
          caption: `╭━━━〔 📥 DOWNLOADED 〕━━━┈⊷
┃ 📌 ${data.result.title || 'YouTube Audio'}
┃ 🧛 "The darkness downloads."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to download. API may be down.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
