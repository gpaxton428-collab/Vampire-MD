export default {
  name: 'vv',
  description: 'Convert view-once messages to viewable format',
  category: 'tools',
  aliases: ['viewonce', 'vo'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    // Check if replying to a message
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Please reply to a view-once message!
┃ 
┃ Usage: Reply to a view-once message with ${prefix}vv
┃ 
┃ 🧛 "Reveal what was hidden."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      let mediaMessage = null;
      let mediaType = '';

      if (quoted.imageMessage || quoted.viewOnceMessageV2?.message?.imageMessage) {
        mediaMessage = quoted.viewOnceMessageV2?.message?.imageMessage || quoted.imageMessage;
        mediaType = 'image';
      } else if (quoted.videoMessage || quoted.viewOnceMessageV2?.message?.videoMessage) {
        mediaMessage = quoted.viewOnceMessageV2?.message?.videoMessage || quoted.videoMessage;
        mediaType = 'video';
      } else if (quoted.viewOnceMessage?.message?.imageMessage) {
        mediaMessage = quoted.viewOnceMessage.message.imageMessage;
        mediaType = 'image';
      } else if (quoted.viewOnceMessage?.message?.videoMessage) {
        mediaMessage = quoted.viewOnceMessage.message.videoMessage;
        mediaType = 'video';
      }

      if (!mediaMessage) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This is not a view-once message.
┃ Please reply to a view-once (disappearing) message.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      // Send the media without view-once flag
      if (mediaType === 'image') {
        await sock.sendMessage(chatId, {
          image: mediaMessage.url || mediaMessage.directPath || mediaMessage,
          caption: `🖼️ *View-Once Image Revealed*\n\n> 🧛 "Nothing stays hidden forever."`
        }, { quoted: msg });
      } else if (mediaType === 'video') {
        await sock.sendMessage(chatId, {
          video: mediaMessage.url || mediaMessage.directPath || mediaMessage,
          caption: `🎥 *View-Once Video Revealed*\n\n> 🧛 "The darkness reveals all secrets."`
        }, { quoted: msg });
      }

    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to convert view-once: ${error.message}
┃ 
┃ 🧛 "Some secrets are better left buried."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
