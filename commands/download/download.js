import fs from 'fs';
import path from 'path';

export default {
  name: 'download',
  description: 'Download a file from bot',
  category: 'download',
  aliases: ['dl', 'get'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const file = args[0];

    if (!file) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📥 DOWNLOAD 〕━━━┈⊷
┃ Usage: ${prefix}download <filename>
┃ 
┃ Example: ${prefix}download package.json
┃ 🧛 "Download the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      if (!fs.existsSync(file)) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ File not found: ${file}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      const content = fs.readFileSync(file);
      const fileName = path.basename(file);

      await sock.sendMessage(chatId, {
        document: content,
        fileName: fileName,
        mimetype: 'application/octet-stream',
        caption: `╭━━━〔 📥 DOWNLOADED 〕━━━┈⊷
┃ 📄 ${fileName}
┃ 📊 ${(content.length / 1024).toFixed(1)}KB
┃ 🧛 "The file is yours."
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
