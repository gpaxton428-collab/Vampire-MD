export default {
  name: 'stickertoimage',
  description: 'Convert sticker to image',
  category: 'tools',
  aliases: ['s2i', 'sticker2img'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted || !quoted.stickerMessage) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🖼️ STICKER TO IMAGE 〕━━━┈⊷
┃ Reply to a sticker!
┃ 
┃ Usage: Reply with ${prefix}stickertoimage
┃ 🧛 "The darkness converts."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const buffer = await sock.downloadMediaMessage(quoted);

      if (!buffer) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to download sticker.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      await sock.sendMessage(chatId, {
        image: buffer,
        caption: `╭━━━〔 🖼️ STICKER TO IMAGE 〕━━━┈⊷
┃ ✅ Converted successfully!
┃ 🧛 "The darkness converts."
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
