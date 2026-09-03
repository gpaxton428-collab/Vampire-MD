import fs from 'fs';
import path from 'path';

export default {
  name: 'ls',
  description: 'List files in bot directory',
  category: 'tools',
  aliases: ['list', 'dir'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const dir = args[0] || '.';

    try {
      const files = fs.readdirSync(dir);
      let fileList = `╭━━━〔 📂 FILES IN ${dir} 〕━━━┈⊷\n`;
      
      let filesCount = 0;
      let dirsCount = 0;
      
      files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);
        const isDir = stats.isDirectory();
        const size = isDir ? '' : ` (${(stats.size / 1024).toFixed(1)}KB)`;
        const icon = isDir ? '📁' : '📄';
        fileList += `┃ ${icon} ${file}${size}\n`;
        if (isDir) dirsCount++;
        else filesCount++;
      });
      
      fileList += `┃ \n┃ 📊 ${filesCount} files, ${dirsCount} folders\n`;
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
