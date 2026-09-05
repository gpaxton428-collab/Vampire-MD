import webp from 'node-webpmux';
import crypto from 'crypto';

export default {
  name: 'steal',
  description: 'Steal a sticker and rename it',
  category: 'tools',
  aliases: ['stealsticker', 'copysticker'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted || !quoted.stickerMessage) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🎯 STEAL 〕━━━┈⊷
┃ Reply to a sticker!
┃ 
┃ Usage: Reply with ${prefix}steal
┃ 🧛 "The darkness steals."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const emoji = args[0] || '🧛';
    const packName = 'Paxton 👑';
    const author = 'Vampire MD';

    try {
      const stickerBuffer = await sock.downloadMediaMessage(quoted);

      if (!stickerBuffer) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to download sticker.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      const img = new webp.Image();
      await img.load(stickerBuffer);

      const json = {
        'sticker-pack-id': crypto.randomBytes(32).toString('hex'),
        'sticker-pack-name': packName,
        'sticker-pack-publisher': author,
        'emojis': [emoji]
      };

      const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
      const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
      const exif = Buffer.concat([exifAttr, jsonBuffer]);
      exif.writeUIntLE(jsonBuffer.length, 14, 4);

      img.exif = exif;
      const finalBuffer = await img.save(null);

      await sock.sendMessage(chatId, {
        sticker: finalBuffer
      }, { quoted: msg });

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ STOLEN 〕━━━┈⊷
┃ 📦 Pack: ${packName}
┃ 🎭 Emoji: ${emoji}
┃ 🧛 "The darkness steals."
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
