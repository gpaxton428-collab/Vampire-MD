import fs from 'fs';

export default {
  name: 'addsudo',
  description: 'Add sudo user',
  category: 'owner',
  aliases: ['sudo', 'addadmin'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 ADD SUDO 〕━━━┈⊷
┃ Usage: ${prefix}addsudo <number>
┃ 
┃ Example: ${prefix}addsudo 27797352930
┃ 🧛 "Share the power."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const sudoFile = './sudo.json';
      let sudo = [];
      if (fs.existsSync(sudoFile)) {
        sudo = JSON.parse(fs.readFileSync(sudoFile, 'utf8'));
      }

      const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

      if (!sudo.includes(userJid)) {
        sudo.push(userJid);
        fs.writeFileSync(sudoFile, JSON.stringify(sudo, null, 2));

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ SUDO ADDED 〕━━━┈⊷
┃ 👤 ${target}
┃ 👑 Sudo user added!
┃ 🧛 "Power shared."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ⚠️ ALREADY SUDO 〕━━━┈⊷
┃ ${target} is already sudo.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
