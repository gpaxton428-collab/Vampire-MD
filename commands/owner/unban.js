import fs from 'fs';

export default {
  name: 'unban',
  description: 'Unban a user from using the bot',
  category: 'owner',
  aliases: ['unblock'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 UNBAN 〕━━━┈⊷
┃ Usage: ${prefix}unban @user
┃ 
┃ Example: ${prefix}unban @username
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      let bannedUsers = [];
      const banFile = './banned.json';

      if (fs.existsSync(banFile)) {
        bannedUsers = JSON.parse(fs.readFileSync(banFile, 'utf8'));
      }

      let userJid = target;
      if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
        userJid = msg.message.extendedTextMessage.contextInfo.mentionedJid[0];
      }

      if (!userJid.includes('@')) {
        userJid = userJid + '@s.whatsapp.net';
      }

      const index = bannedUsers.indexOf(userJid);
      if (index !== -1) {
        bannedUsers.splice(index, 1);
        fs.writeFileSync(banFile, JSON.stringify(bannedUsers, null, 2));

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ UNBANNED 〕━━━┈⊷
┃ 👤 User: ${userJid}
┃ ✅ Status: UNBANNED
┃ 
┃ 🧛 "You have been forgiven. Return to the light."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ℹ️ NOT FOUND 〕━━━┈⊷
┃ 👤 ${userJid} is not banned.
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
