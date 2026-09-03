export default {
  name: 'open',
  description: 'Open group (admins only)',
  category: 'group',
  aliases: ['unlock'],
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
      await sock.groupSettingUpdate(chatId, 'not_announcement');
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔓 GROUP OPENED 〕━━━┈⊷
┃ All members can send messages.
┃ 
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
