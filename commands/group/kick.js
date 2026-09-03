export default {
  name: 'kick',
  description: 'Remove a member from the group',
  category: 'group',
  aliases: ['remove', 'boot'],
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
        text: `╭━━━〔 👥 KICK MEMBER 〕━━━┈⊷
┃ Usage: ${prefix}kick @user
┃ 
┃ Example: ${prefix}kick @username
┃ 
┃ 🧛 "You have been banished."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      await sock.groupParticipantsUpdate(chatId, [target], 'remove');
      
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ KICKED 〕━━━┈⊷
┃ 👤 ${target} has been removed from the group.
┃ 
┃ 🧛 "Another soul cast into the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to kick user: ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
