import fs from 'fs';
import path from 'path';

export default {
  name: 'download',
  description: 'Download a file from the bot',
  category: 'tools',
  aliases: ['dl', 'get'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const filePath = args[0];

    if (!filePath) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}download <filename>
┃ 
┃ Example: ${prefix}download package.json
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      if (!fs.existsSync(filePath)) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ File not found: ${filePath}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      const content = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);
      
      await sock.sendMessage(chatId, {
        document: content,
        fileName: fileName,
        mimetype: 'application/octet-stream',
        caption: `╭━━━〔 📥 FILE DOWNLOADED 〕━━━┈⊷
┃ 📄 ${fileName}
┃ 📊 ${(content.length / 1024).toFixed(1)}KB
┃ 
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
