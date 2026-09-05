export default {
  name: 'open',
  description: 'Open group (admins only)',
  category: 'group',
  aliases: ['unlockgroup'],
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
      await sock.groupSettingUpdate(chatId, 'unlocked');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔓 GROUP OPENED 〕━━━┈⊷
┃ Group settings unlocked.
┃ 🧛 "The coven is open."
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
