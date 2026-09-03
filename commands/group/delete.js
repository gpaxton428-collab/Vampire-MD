export default {
  name: 'delete',
  description: 'Delete a message (reply to it)',
  category: 'group',
  aliases: ['del', 'rm'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Reply to a message to delete it.
┃ 
┃ Usage: Reply to a message with ${prefix}delete
┃ 
┃ 🧛 "Erase the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      const key = {
        remoteJid: chatId,
        fromMe: true,
        id: msg.message?.extendedTextMessage?.contextInfo?.stanzaId
      };

      await sock.sendMessage(chatId, { delete: key });
      
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ DELETED 〕━━━┈⊷
┃ Message deleted successfully.
┃ 
┃ 🧛 "Erased from existence."
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
