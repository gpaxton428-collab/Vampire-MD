import fs from 'fs';

export default {
  name: 'ban',
  description: 'Ban a user from using bot',
  category: 'dangerous',
  aliases: ['blockuser'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🚫 BAN USER 〕━━━┈⊷
┃ Usage: ${prefix}ban <number>
┃ 
┃ Example: ${prefix}ban 27797352930
┃ 
┃ 🧛 "The darkness banishes."
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

      if (!banned.includes(userJid)) {
        banned.push(userJid);
        fs.writeFileSync(banFile, JSON.stringify(banned, null, 2));

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ BANNED 〕━━━┈⊷
┃ 👤 ${target}
┃ 🚫 Status: BANNED
┃ 🧛 "Banished to the void."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ⚠️ ALREADY BANNED 〕━━━┈⊷
┃ ${target} is already banned.
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
