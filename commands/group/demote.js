export default {
  name: 'demote',
  description: 'Demote admin to member',
  category: 'group',
  aliases: ['removeadmin'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    let target = args[0];
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;

    if (mentioned && mentioned.length > 0) {
      target = mentioned[0];
    }

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 DEMOTE 〕━━━┈⊷
┃ Usage: ${prefix}demote @user
┃ 
┃ Example: ${prefix}demote @username
┃ 🧛 "Power taken."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      await sock.groupParticipantsUpdate(chatId, [target], 'demote');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ DEMOTED 〕━━━┈⊷
┃ 👤 ${target} is now a member.
┃ 🧛 "Fallen from grace."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
