export default {
  name: 'unpin',
  description: 'Unpin a pinned message',
  category: 'group',
  aliases: ['unpinmsg'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📌 UNPIN 〕━━━┈⊷
┃ Reply to a pinned message to unpin it!
┃ 
┃ Usage: Reply with ${prefix}unpin
┃ 🧛 "Unpin the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const key = {
        remoteJid: chatId,
        fromMe: true,
        id: msg.message?.extendedTextMessage?.contextInfo?.stanzaId
      };

      await sock.sendMessage(chatId, {
        pin: {
          type: 'unpin',
          key: key
        }
      });

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📌 UNPINNED 〕━━━┈⊷
┃ ✅ Message unpinned!
┃ 🧛 "The darkness is unpinned."
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
