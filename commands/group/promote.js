export default {
  name: 'promote',
  description: 'Promote a member to admin',
  category: 'group',
  aliases: ['makeadmin'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    if (!chatId.endsWith('@g.us')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    let target = args[0];
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;

    if (mentioned && mentioned.length > 0) {
      target = mentioned[0];
    }

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 PROMOTE 〕━━━┈⊷
┃ Usage: ${prefix}promote @user
┃ 
┃ Example: ${prefix}promote @username
┃ 
┃ 🧛 "Power is given to the worthy."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      await sock.groupParticipantsUpdate(chatId, [target], 'promote');
      
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ PROMOTED 〕━━━┈⊷
┃ 👑 ${target} has been promoted to admin!
┃ 
┃ 🧛 "Rise, my child. Power awaits."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to promote user: ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
