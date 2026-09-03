import fs from 'fs';

export default {
  name: 'ban',
  description: 'Ban a user from using the bot',
  category: 'owner',
  aliases: ['block'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 BAN 〕━━━┈⊷
┃ Usage: ${prefix}ban @user
┃ 
┃ Example: ${prefix}ban @username
┃ ╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      let bannedUsers = [];
      const banFile = './banned.json';

      if (fs.existsSync(banFile)) {
        bannedUsers = JSON.parse(fs.readFileSync(banFile, 'utf8'));
      }

      // Extract JID from mention or use as is
      let userJid = target;
      if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
        userJid = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
      }

      if (!userJid.includes('@')) {
        userJid = userJid + '@s.whatsapp.net';
      }

      if (!bannedUsers.includes(userJid)) {
        bannedUsers.push(userJid);
        fs.writeFileSync(banFile, JSON.stringify(bannedUsers, null, 2));

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ BANNED 〕━━━┈⊷
┃ 👤 User: ${userJid}
┃ 🚫 Status: BANNED
┃ 
┃ 🧛 "You have been banished to the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ⚠️ ALREADY BANNED 〕━━━┈⊷
┃ 👤 ${userJid} is already banned.
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
