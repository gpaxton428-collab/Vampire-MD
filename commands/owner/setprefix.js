import fs from 'fs';
import path from 'path';

export default {
  name: 'setprefix',
  description: 'Change the bot command prefix',
  category: 'owner',
  aliases: ['prefix', 'changeprefix'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const newPrefix = args.join(' ').trim();
    const current = process.env.PREFIX || '.';

    if (!args.length) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ⚙️ SET PREFIX 〕━━━┈⊷
┃ Current Prefix: ${current}
┃ 
┃ Usage: ${prefix}setprefix <newprefix>
┃ 
┃ Examples:
┃ ${prefix}setprefix .
┃ ${prefix}setprefix !
┃ ${prefix}setprefix none  (prefixless mode)
┃ 
┃ 🧛 "Change the summoning word."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (!newPrefix) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Prefix cannot be empty.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      // Update .env file
      const envPath = path.join(process.cwd(), '.env');
      let envContent = '';
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      
      const lines = envContent.split('\n');
      const prefixIndex = lines.findIndex(line => line.startsWith('PREFIX='));
      
      if (prefixIndex >= 0) {
        lines[prefixIndex] = `PREFIX=${newPrefix}`;
      } else {
        lines.push(`PREFIX=${newPrefix}`);
      }
      
      fs.writeFileSync(envPath, lines.join('\n'));

      // Update memory
      process.env.PREFIX = newPrefix;
      global.prefix = newPrefix;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ PREFIX UPDATED 〕━━━┈⊷
┃ New Prefix: ${newPrefix}
┃ 
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
