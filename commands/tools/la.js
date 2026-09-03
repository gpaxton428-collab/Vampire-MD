import fs from 'fs';
import path from 'path';

export default {
  name: 'la',
  description: 'List all files including hidden',
  category: 'tools',
  aliases: ['listall', 'lal'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const dir = args[0] || '.';

    try {
      const files = fs.readdirSync(dir);
      let fileList = `╭━━━〔 📂 ALL FILES IN ${dir} 〕━━━┈⊷\n`;
      
      let hiddenCount = 0;
      let visibleCount = 0;
      
      files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);
        const isDir = stats.isDirectory();
        const isHidden = file.startsWith('.');
        const size = isDir ? '' : ` (${(stats.size / 1024).toFixed(1)}KB)`;
        const icon = isDir ? '📁' : '📄';
        const hidden = isHidden ? '🔒' : '👁️';
        fileList += `┃ ${hidden} ${icon} ${file}${size}\n`;
        if (isHidden) hiddenCount++;
        else visibleCount++;
      });
      
      fileList += `┃ \n┃ 📊 ${visibleCount} visible, ${hiddenCount} hidden\n`;
      fileList += `╰━━━━━━━━━━━━━━━┈⊷`;

      await sock.sendMessage(chatId, { text: fileList }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
