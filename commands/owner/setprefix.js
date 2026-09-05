import fs from 'fs';
import path from 'path';

export default {
  name: 'setprefix',
  description: 'Change bot prefix',
  category: 'owner',
  aliases: ['prefix', 'changeprefix'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const newPrefix = args[0];

    if (!newPrefix) {
      const current = process.env.PREFIX || '.';
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ⚙️ PREFIX 〕━━━┈⊷
┃ Current: ${current}
┃ Usage: ${prefix}setprefix <new>
┃ 
┃ 🧛 "Change the summoning word."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const envPath = path.join(process.cwd(), '.env');
      let envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split('\n');
      const prefixIndex = lines.findIndex(line => line.startsWith('PREFIX='));
      if (prefixIndex >= 0) {
        lines[prefixIndex] = `PREFIX=${newPrefix}`;
      } else {
        lines.push(`PREFIX=${newPrefix}`);
      }
      fs.writeFileSync(envPath, lines.join('\n'));
      process.env.PREFIX = newPrefix;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ PREFIX UPDATED 〕━━━┈⊷
┃ New Prefix: ${newPrefix}
┃ 🧛 "The summoning word has changed."
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
