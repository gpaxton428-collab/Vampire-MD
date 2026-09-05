import webp from 'node-webpmux';
import crypto from 'crypto';

export default {
  name: 'imagetosticker',
  description: 'Convert image to sticker',
  category: 'tools',
  aliases: ['i2s', 'img2sticker'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted || !quoted.imageMessage) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🎨 IMAGE TO STICKER 〕━━━┈⊷
┃ Reply to an image!
┃ 
┃ Usage: Reply with ${prefix}imagetosticker
┃ 🧛 "The darkness creates."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const buffer = await sock.downloadMediaMessage(quoted);

      if (!buffer) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to download image.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      const img = new webp.Image();
      await img.load(buffer);

      const json = {
        'sticker-pack-id': crypto.randomBytes(32).toString('hex'),
        'sticker-pack-name': 'Vampire Pack',
        'sticker-pack-publisher': 'Vampire MD',
        'emojis': ['🧛']
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
        text: `╭━━━〔 ✅ STICKER CREATED 〕━━━┈⊷
┃ 🧛 "The darkness creates."
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
