import fs from 'fs';

export default {
  name: 'cat',
  description: 'View content of a file',
  category: 'tools',
  aliases: ['view', 'show'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const filePath = args[0];

    if (!filePath) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}cat <filename>
┃ 
┃ Example: ${prefix}cat package.json
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      const maxLines = 50;
      const truncated = lines.length > maxLines;
      const displayContent = lines.slice(0, maxLines).join('\n');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📄 FILE: ${filePath} 〕━━━┈⊷
┃ 
┃ ${displayContent}
┃ ${truncated ? `\n┃ ... (${lines.length - maxLines} more lines)` : ''}
┃ 
┃ 📊 ${lines.length} lines, ${(content.length / 1024).toFixed(1)}KB
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
