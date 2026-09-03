import fs from 'fs';

export default {
  name: 'block',
  description: 'Block a user from using the bot',
  category: 'owner',
  aliases: ['ban'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🚫 BLOCK USER 〕━━━┈⊷
┃ Usage: ${prefix}block <number>
┃ 
┃ Example: ${prefix}block 27797352930
┃ 
┃ 🧛 "Banish the darkness."
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

      if (!blockedUsers.includes(userJid)) {
        blockedUsers.push(userJid);
        fs.writeFileSync(blockFile, JSON.stringify(blockedUsers, null, 2));

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ BLOCKED 〕━━━┈⊷
┃ 👤 ${target}
┃ 🚫 Status: BLOCKED
┃ 
┃ 🧛 "Banished to the void."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ⚠️ ALREADY BLOCKED 〕━━━┈⊷
┃ ${target} is already blocked.
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
