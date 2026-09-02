import fs from 'fs';

export default {
  name: 'removesudo',
  description: 'Remove a sudo user',
  category: 'owner',
  aliases: ['rmsudo', 'desudo'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 REMOVE SUDO 〕━━━┈⊷
┃ Usage: ${prefix}removesudo <number>
┃ 
┃ Example: ${prefix}removesudo 27797352930
┃ 
┃ 🧛 "Revoke the power."
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

      const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      const index = sudoUsers.indexOf(userJid);

      if (index !== -1) {
        sudoUsers.splice(index, 1);
        fs.writeFileSync(sudoFile, JSON.stringify(sudoUsers, null, 2));

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ SUDO REMOVED 〕━━━┈⊷
┃ 👤 ${userJid}
┃ 👑 Status: REMOVED
┃ 
┃ 🧛 "Power revoked."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ⚠️ NOT SUDO 〕━━━┈⊷
┃ ${userJid} is not a sudo user.
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
