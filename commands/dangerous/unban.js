import fs from 'fs';

export default {
  name: 'unban',
  description: 'Unban a user',
  category: 'dangerous',
  aliases: ['unblockuser'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ UNBAN USER 〕━━━┈⊷
┃ Usage: ${prefix}unban <number>
┃ 
┃ Example: ${prefix}unban 27797352930
┃ 
┃ 🧛 "The darkness forgives."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const banFile = './banned.json';
      let banned = [];
      if (fs.existsSync(banFile)) {
        banned = JSON.parse(fs.readFileSync(banFile, 'utf8'));
      }

      const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      const index = banned.indexOf(userJid);

      if (index !== -1) {
        banned.splice(index, 1);
        fs.writeFileSync(banFile, JSON.stringify(banned, null, 2));

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ UNBANNED 〕━━━┈⊷
┃ 👤 ${target}
┃ ✅ Status: UNBANNED
┃ 🧛 "Forgiven and returned."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ℹ️ NOT BANNED 〕━━━┈⊷
┃ ${target} is not banned.
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
