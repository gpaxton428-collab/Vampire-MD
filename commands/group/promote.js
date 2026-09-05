export default {
  name: 'promote',
  description: 'Promote member to admin',
  category: 'group',
  aliases: ['makeadmin'],
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
        text: `╭━━━〔 👑 PROMOTE 〕━━━┈⊷
┃ Usage: ${prefix}promote @user
┃ 
┃ Example: ${prefix}promote @username
┃ 🧛 "Power given."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      await sock.groupParticipantsUpdate(chatId, [target], 'promote');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ PROMOTED 〕━━━┈⊷
┃ 👑 ${target} is now admin!
┃ 🧛 "Rise, my child."
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
