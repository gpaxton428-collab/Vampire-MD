import fs from 'fs';

export default {
  name: 'unblock',
  description: 'Unblock a user',
  category: 'owner',
  aliases: ['unban'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ UNBLOCK USER 〕━━━┈⊷
┃ Usage: ${prefix}unblock <number>
┃ 
┃ Example: ${prefix}unblock 27797352930
┃ 
┃ 🧛 "Return from the void."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      let blockedUsers = [];
      const blockFile = './blocked.json';

      if (fs.existsSync(blockFile)) {
        blockedUsers = JSON.parse(fs.readFileSync(blockFile, 'utf8'));
      }

      const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      const index = blockedUsers.indexOf(userJid);

      if (index !== -1) {
        blockedUsers.splice(index, 1);
        fs.writeFileSync(blockFile, JSON.stringify(blockedUsers, null, 2));

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ UNBLOCKED 〕━━━┈⊷
┃ 👤 ${target}
┃ ✅ Status: UNBLOCKED
┃ 
┃ 🧛 "Forgiven and returned."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ℹ️ NOT BLOCKED 〕━━━┈⊷
┃ ${target} is not blocked.
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
