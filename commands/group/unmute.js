export default {
  name: 'unmute',
  description: 'Unmute group (admins only)',
  category: 'group',
  aliases: ['unsilence', 'unlockchat'],
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
      await sock.groupSettingUpdate(chatId, 'not_announcement');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔊 GROUP UNMUTED 〕━━━┈⊷
┃ All members can send messages.
┃ 🧛 "The coven speaks again."
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
