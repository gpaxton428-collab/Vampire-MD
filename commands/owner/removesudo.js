import fs from 'fs';

export default {
  name: 'removesudo',
  description: 'Remove sudo user',
  category: 'owner',
  aliases: ['rmsudo', 'desudo'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 REMOVE SUDO 〕━━━┈⊷
┃ Usage: ${prefix}removesudo <number>
┃ 
┃ Example: ${prefix}removesudo 27797352930
┃ 🧛 "Revoke power."
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
      const index = sudo.indexOf(userJid);

      if (index !== -1) {
        sudo.splice(index, 1);
        fs.writeFileSync(sudoFile, JSON.stringify(sudo, null, 2));

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ SUDO REMOVED 〕━━━┈⊷
┃ 👤 ${target}
┃ 👑 Sudo removed!
┃ 🧛 "Power revoked."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ⚠️ NOT SUDO 〕━━━┈⊷
┃ ${target} is not sudo.
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
