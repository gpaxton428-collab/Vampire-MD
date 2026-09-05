export default {
  name: 'kick',
  description: 'Kick member from group',
  category: 'group',
  aliases: ['remove', 'boot'],
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
        text: `╭━━━〔 👥 KICK 〕━━━┈⊷
┃ Usage: ${prefix}kick @user
┃ 
┃ Example: ${prefix}kick @username
┃ 🧛 "Banished."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      await sock.groupParticipantsUpdate(chatId, [target], 'remove');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ KICKED 〕━━━┈⊷
┃ 👤 ${target} has been removed.
┃ 🧛 "Cast into darkness."
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
