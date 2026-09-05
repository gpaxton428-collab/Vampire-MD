import fs from 'fs';

export default {
  name: 'listsudo',
  description: 'List all sudo users',
  category: 'owner',
  aliases: ['sudolist'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    try {
      const sudoFile = './sudo.json';
      let sudo = [];
      if (fs.existsSync(sudoFile)) {
        sudo = JSON.parse(fs.readFileSync(sudoFile, 'utf8'));
      }

      if (sudo.length === 0) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 SUDO LIST 〕━━━┈⊷
┃ No sudo users.
┃ 🧛 "Power is lonely."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      let list = `╭━━━〔 📋 SUDO LIST 〕━━━┈⊷\n`;
      sudo.forEach((user, index) => {
        const num = user.split('@')[0];
        list += `┃ ${index + 1}. +${num}\n`;
      });
      list += `┃ \n┃ 📊 Total: ${sudo.length}\n`;
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
