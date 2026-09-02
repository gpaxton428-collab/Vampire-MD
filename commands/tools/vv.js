export default {
  name: 'vv',
  description: 'Reveal a view-once message (reply to it)',
  category: 'tools',
  aliases: ['viewonce', 'open', 'openphoto', 'openvideo', 'vvphoto'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Reply to a view-once photo / video / audio with this command.
┃ 
┃ Usage: Reply to a view-once message with ${prefix}vv
┃ 
┃ 🧛 "Reveal what was hidden."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    let type = null;
    for (const k of ['imageMessage', 'videoMessage', 'audioMessage']) {
      if (quoted[k]) { type = k; break; }
    }

    if (!type) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Quoted message has no image, video, or audio.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      const msgContent = quoted[type];
      const mediaType = type.replace('Message', '');
      
      const stream = await sock.downloadMediaMessage(quoted);
      
      if (type === 'imageMessage') {
        await sock.sendMessage(chatId, {
          image: stream,
          caption: msgContent?.caption || '🖼️ *View-Once Image Revealed*',
          mimetype: msgContent?.mimetype || 'image/jpeg'
        }, { quoted: msg });
      } else if (type === 'videoMessage') {
        await sock.sendMessage(chatId, {
          video: stream,
          caption: msgContent?.caption || '🎥 *View-Once Video Revealed*',
          mimetype: msgContent?.mimetype || 'video/mp4'
        }, { quoted: msg });
      } else if (type === 'audioMessage') {
        await sock.sendMessage(chatId, {
          audio: stream,
          mimetype: msgContent?.mimetype || 'audio/mp4',
          ptt: msgContent?.ptt || false
        }, { quoted: msg });
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👁️ VIEW-ONCE REVEALED 〕━━━┈⊷
┃ ✅ Successfully revealed!
┃ 
┃ 🧛 "Nothing stays hidden forever."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });

    } catch (err) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to open media: ${err.message}
┃ 
┃ 🧛 "Some secrets are better left buried."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
