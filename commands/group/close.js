export default {
  name: 'close',
  description: 'Close group (admins only)',
  category: 'group',
  aliases: ['lock'],
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
      await sock.groupSettingUpdate(chatId, 'announcement');
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔒 GROUP CLOSED 〕━━━┈⊷
┃ Only admins can send messages.
┃ 
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
