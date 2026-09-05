import fs from 'fs';

export default {
  name: 'banlist',
  description: 'List all banned users',
  category: 'owner',
  aliases: ['banned', 'blocklist'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    try {
      const banFile = './banned.json';
      let banned = [];
      if (fs.existsSync(banFile)) {
        banned = JSON.parse(fs.readFileSync(banFile, 'utf8'));
      }

      if (banned.length === 0) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 BAN LIST 〕━━━┈⊷
┃ No users banned.
┃ 🧛 "The void is empty."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      let list = `╭━━━〔 📋 BAN LIST 〕━━━┈⊷\n`;
      banned.forEach((user, index) => {
        const num = user.split('@')[0];
        list += `┃ ${index + 1}. +${num}\n`;
      });
      list += `┃ \n┃ 📊 Total: ${banned.length}\n`;
      list += `╰━━━━━━━━━━━━━━━┈⊷`;

      await sock.sendMessage(chatId, { text: list }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
