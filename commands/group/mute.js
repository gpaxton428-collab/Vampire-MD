export default {
  name: 'mute',
  description: 'Mute group (admins only)',
  category: 'group',
  aliases: ['silence', 'lockchat'],
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
      await sock.groupSettingUpdate(chatId, 'announcement');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔇 GROUP MUTED 〕━━━┈⊷
┃ Only admins can send messages.
┃ 🧛 "The coven is silent."
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
