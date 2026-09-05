import fs from 'fs';
import path from 'path';

export default {
  name: 'setfooter',
  description: 'Change bot footer',
  category: 'owner',
  aliases: ['footer', 'setfoot'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const newFooter = args.join(' ');

    if (!newFooter) {
      const current = process.env.BOT_FOOTER || '> Powered by Vampire Tech';
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📝 BOT FOOTER 〕━━━┈⊷
┃ Current: ${current}
┃ Usage: ${prefix}setfooter <text>
┃ 
┃ 🧛 "Change the signature."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const envPath = path.join(process.cwd(), '.env');
      let envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split('\n');
      const footerIndex = lines.findIndex(line => line.startsWith('BOT_FOOTER='));
      if (footerIndex >= 0) {
        lines[footerIndex] = `BOT_FOOTER=${newFooter}`;
      } else {
        lines.push(`BOT_FOOTER=${newFooter}`);
      }
      fs.writeFileSync(envPath, lines.join('\n'));
      process.env.BOT_FOOTER = newFooter;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ FOOTER UPDATED 〕━━━┈⊷
┃ New Footer: ${newFooter}
┃ 🧛 "The signature has changed."
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
