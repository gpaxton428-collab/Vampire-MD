import fs from 'fs';

export default {
  name: 'bannedlist',
  description: 'List all banned users',
  category: 'owner',
  aliases: ['banlist', 'banned'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    try {
      const banFile = './banned.json';
      let bannedUsers = [];

      if (fs.existsSync(banFile)) {
        bannedUsers = JSON.parse(fs.readFileSync(banFile, 'utf8'));
      }

      if (bannedUsers.length === 0) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 BANNED LIST 〕━━━┈⊷
┃ ℹ️ No users are currently banned.
┃ 
┃ 🧛 "The darkness is empty."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      let list = `╭━━━〔 📋 BANNED LIST 〕━━━┈⊷\n`;
      bannedUsers.forEach((user, index) => {
        list += `┃ ${index + 1}. ${user}\n`;
      });
      list += `┃ \n┃ Total: ${bannedUsers.length} banned users\n╰━━━━━━━━━━━━━━━┈⊷`;

      await sock.sendMessage(chatId, {
        text: list
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
