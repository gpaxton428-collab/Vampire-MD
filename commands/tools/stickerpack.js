import fs from 'fs';
import path from 'path';

export default {
  name: 'stickerpack',
  description: 'Get sticker pack information',
  category: 'tools',
  aliases: ['packinfo', 'stickerinfo'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted || !quoted.stickerMessage) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📦 STICKER PACK 〕━━━┈⊷
┃ Reply to a sticker!
┃ 
┃ Usage: Reply with ${prefix}stickerpack
┃ 🧛 "The darkness reveals."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const sticker = quoted.stickerMessage;
      const packName = sticker.stickerPackName || 'Unknown Pack';
      const author = sticker.stickerAuthor || 'Unknown Author';
      const emojis = sticker.emoji || '🧛';

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📦 STICKER PACK 〕━━━┈⊷
┃ 📦 Pack: ${packName}
┃ 👤 Author: ${author}
┃ 🎭 Emojis: ${emojis}
┃ 🧛 "The darkness reveals."
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
