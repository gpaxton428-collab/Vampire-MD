export default {
  name: 'close',
  description: 'Close group (admins only)',
  category: 'group',
  aliases: ['lockgroup'],
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
      await sock.groupSettingUpdate(chatId, 'locked');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔒 GROUP CLOSED 〕━━━┈⊷
┃ Group settings locked.
┃ 🧛 "The coven is sealed."
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
