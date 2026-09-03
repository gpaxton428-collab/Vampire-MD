import fs from 'fs';

export default {
  name: 'addsudo',
  description: 'Add a sudo user (extra owner)',
  category: 'owner',
  aliases: ['sudo', 'addadmin'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 ADD SUDO 〕━━━┈⊷
┃ Usage: ${prefix}addsudo <number>
┃ 
┃ Example: ${prefix}addsudo 27797352930
┃ 
┃ 🧛 "Share the power."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      let sudoUsers = [];
      const sudoFile = './sudo.json';

      if (fs.existsSync(sudoFile)) {
        sudoUsers = JSON.parse(fs.readFileSync(sudoFile, 'utf8'));
      }

      // Clean the target JID
      let userJid = target;
      if (!userJid.includes('@')) {
        userJid = `${userJid}@s.whatsapp.net`;
      }

      // Check if already sudo
      const exists = sudoUsers.some(user => user === userJid || user.split('@')[0] === target);
      
      if (!exists) {
        sudoUsers.push(userJid);
        fs.writeFileSync(sudoFile, JSON.stringify(sudoUsers, null, 2));

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ SUDO ADDED 〕━━━┈⊷
┃ 👤 ${userJid}
┃ 👑 Status: SUDO USER
┃ 
┃ 🧛 "Power shared."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ⚠️ ALREADY SUDO 〕━━━┈⊷
┃ ${userJid} is already a sudo user.
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
