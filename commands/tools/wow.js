export default {
  name: 'wow',
  description: 'Convert view-once messages to viewable format',
  category: 'tools',
  aliases: ['reveal', 'show'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Please reply to a view-once message!
┃ 
┃ Usage: Reply to a view-once message with ${prefix}wow
┃ 
┃ 🧛 "Reveal what was hidden."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      let mediaMessage = null;
      let mediaType = '';

      // Check for view-once messages
      if (quoted.viewOnceMessageV2) {
        const msgContent = quoted.viewOnceMessageV2.message;
        if (msgContent.imageMessage) {
          mediaMessage = msgContent.imageMessage;
          mediaType = 'image';
        } else if (msgContent.videoMessage) {
          mediaMessage = msgContent.videoMessage;
          mediaType = 'video';
        }
      } else if (quoted.viewOnceMessage) {
        const msgContent = quoted.viewOnceMessage.message;
        if (msgContent.imageMessage) {
          mediaMessage = msgContent.imageMessage;
          mediaType = 'image';
        } else if (msgContent.videoMessage) {
          mediaMessage = msgContent.videoMessage;
          mediaType = 'video';
        }
      } else if (quoted.imageMessage) {
        mediaMessage = quoted.imageMessage;
        mediaType = 'image';
      } else if (quoted.videoMessage) {
        mediaMessage = quoted.videoMessage;
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

      // Download and send the media
      const mediaStream = await sock.downloadMediaMessage(quoted);

      if (mediaType === 'image') {
        await sock.sendMessage(chatId, {
          image: mediaStream,
          caption: `🖼️ *View-Once Image Revealed*\n\n> 🧛 "Nothing stays hidden forever."`
        }, { quoted: msg });
      } else if (mediaType === 'video') {
        await sock.sendMessage(chatId, {
          video: mediaStream,
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
