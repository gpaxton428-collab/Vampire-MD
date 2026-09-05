import fs from 'fs';
import path from 'path';

export default {
  name: 'setbotname',
  description: 'Change bot name',
  category: 'owner',
  aliases: ['botname', 'name'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const newName = args.join(' ');

    if (!newName) {
      const current = process.env.BOT_NAME || 'Vampire MD';
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📛 BOT NAME 〕━━━┈⊷
┃ Current: ${current}
┃ Usage: ${prefix}setbotname <name>
┃ 
┃ 🧛 "Rename the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const envPath = path.join(process.cwd(), '.env');
      let envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split('\n');
      const nameIndex = lines.findIndex(line => line.startsWith('BOT_NAME='));
      if (nameIndex >= 0) {
        lines[nameIndex] = `BOT_NAME=${newName}`;
      } else {
        lines.push(`BOT_NAME=${newName}`);
      }
      fs.writeFileSync(envPath, lines.join('\n'));
      process.env.BOT_NAME = newName;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ BOT NAME UPDATED 〕━━━┈⊷
┃ New Name: ${newName}
┃ 🧛 "The darkness has a new name."
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
