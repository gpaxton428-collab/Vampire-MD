import fs from 'fs';

export default {
  name: 'blockedlist',
  description: 'List all blocked users',
  category: 'owner',
  aliases: ['blocklist', 'bannedlist'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    try {
      let blockedUsers = [];
      const blockFile = './blocked.json';

      if (fs.existsSync(blockFile)) {
        blockedUsers = JSON.parse(fs.readFileSync(blockFile, 'utf8'));
      }

      if (blockedUsers.length === 0) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 BLOCKED LIST 〕━━━┈⊷
┃ No users are currently blocked.
┃ 
┃ 🧛 "The void is empty."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      let list = `╭━━━〔 📋 BLOCKED LIST 〕━━━┈⊷\n`;
      blockedUsers.forEach((user, index) => {
        const number = user.split('@')[0];
        list += `┃ ${index + 1}. +${number}\n`;
      });
      list += `┃ \n┃ Total: ${blockedUsers.length} blocked users\n╰━━━━━━━━━━━━━━━┈⊷`;

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
