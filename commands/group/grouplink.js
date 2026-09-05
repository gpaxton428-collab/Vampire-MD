export default {
  name: 'grouplink',
  description: 'Get group invite link',
  category: 'group',
  aliases: ['link', 'invitelink'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const code = await sock.groupInviteCode(chatId);
      const link = `https://chat.whatsapp.com/${code}`;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 GROUP LINK 〕━━━┈⊷
┃ ${link}
┃ 🧛 "Share the coven."
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
