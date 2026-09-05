export default {
  name: 'pin',
  description: 'Pin a message in group',
  category: 'group',
  aliases: ['pinmsg'],
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
        text: `╭━━━〔 📌 PIN 〕━━━┈⊷
┃ Reply to a message to pin it!
┃ 
┃ Usage: Reply with ${prefix}pin
┃ 🧛 "Pin the darkness."
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
          type: 'pin',
          key: key
        }
      });

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📌 PINNED 〕━━━┈⊷
┃ ✅ Message pinned!
┃ 🧛 "The darkness is pinned."
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
