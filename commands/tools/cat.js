import fs from 'fs';

export default {
  name: 'cat',
  description: 'View file content',
  category: 'tools',
  aliases: ['view', 'show'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const file = args[0];

    if (!file) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📄 CAT 〕━━━┈⊷
┃ Usage: ${prefix}cat <filename>
┃ 
┃ Example: ${prefix}cat package.json
┃ 🧛 "Read the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n').length;
      const size = (content.length / 1024).toFixed(1);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📄 ${file} 〕━━━┈⊷
┃ 
┃ ${content.substring(0, 1500)}
┃ ${content.length > 1500 ? `\n┃ ... (${content.length - 1500} more chars)` : ''}
┃ 
┃ 📊 ${lines} lines, ${size}KB
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
