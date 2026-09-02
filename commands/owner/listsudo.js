import fs from 'fs';

export default {
  name: 'listsudo',
  description: 'List all sudo users',
  category: 'owner',
  aliases: ['sudolist', 'sudo'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    try {
      let sudoUsers = [];
      const sudoFile = './sudo.json';

      if (fs.existsSync(sudoFile)) {
        sudoUsers = JSON.parse(fs.readFileSync(sudoFile, 'utf8'));
      }

      if (sudoUsers.length === 0) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👑 SUDO LIST 〕━━━┈⊷
┃ No sudo users found.
┃ 
┃ 🧛 "Power is lonely."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      let list = `╭━━━〔 👑 SUDO LIST 〕━━━┈⊷\n`;
      sudoUsers.forEach((user, index) => {
        const number = user.split('@')[0];
        list += `┃ ${index + 1}. +${number}\n`;
      });
      list += `┃ \n┃ Total: ${sudoUsers.length} sudo users\n╰━━━━━━━━━━━━━━━┈⊷`;

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
