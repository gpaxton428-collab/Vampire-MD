export default {
  name: 'vv',
  description: 'Reveal view-once message',
  category: 'tools',
  aliases: ['viewonce', 'wow'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👁️ VV 〕━━━┈⊷
┃ Reply to a view-once message!
┃ 
┃ Usage: Reply with ${prefix}vv
┃ 🧛 "Reveal what was hidden."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    let type = null;
    if (quoted.imageMessage) type = 'image';
    else if (quoted.videoMessage) type = 'video';
    else if (quoted.audioMessage) type = 'audio';

    if (!type) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Not a media message!
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const buffer = await sock.downloadMediaMessage(quoted);

      if (type === 'image') {
        await sock.sendMessage(chatId, {
          image: buffer,
          caption: '🖼️ *View-Once Revealed*'
        });
      } else if (type === 'video') {
        await sock.sendMessage(chatId, {
          video: buffer,
          caption: '🎥 *View-Once Revealed*'
        });
      } else if (type === 'audio') {
        await sock.sendMessage(chatId, {
          audio: buffer,
          mimetype: 'audio/mpeg'
        });
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ REVEALED 〕━━━┈⊷
┃ 🧛 "Nothing stays hidden forever."
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
