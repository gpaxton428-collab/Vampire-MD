export default {
  name: 'grouplink',
  description: 'Get group invite link',
  category: 'group',
  aliases: ['link', 'invite'],
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

    try {
      const code = await sock.groupInviteCode(chatId);
      const link = `https://chat.whatsapp.com/${code}`;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 GROUP LINK 〕━━━┈⊷
┃ 📌 Invite Link:
┃ ${link}
┃ 
┃ 🧛 "Share the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
┃ 
┃ 💡 Make sure I'm an admin to get the link.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
