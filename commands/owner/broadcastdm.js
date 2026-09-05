export default {
  name: 'broadcastdm',
  description: 'Send message to all DMs',
  category: 'owner',
  aliases: ['bcdm', 'dmbc'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const message = args.join(' ');

    if (!message) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📢 BROADCAST DM 〕━━━┈⊷
┃ Usage: ${prefix}broadcastdm <message>
┃ 🧛 "Speak to the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    await sock.sendMessage(chatId, { text: '📢 Broadcasting to DMs...' }, { quoted: msg });

    try {
      const chats = await sock.chats();
      let sent = 0;
      let failed = 0;

      for (const chat of chats) {
        if (!chat.id.endsWith('@g.us') && !chat.id.endsWith('@newsletter')) {
          try {
            await sock.sendMessage(chat.id, {
              text: `╭━━━〔 📢 BROADCAST DM 〕━━━┈⊷
┃ ${message}
┃ 🧛 "From the master."
╰━━━━━━━━━━━━━━━┈⊷`
            });
            sent++;
            await new Promise(resolve => setTimeout(resolve, 500));
          } catch {
            failed++;
          }
        }
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ BROADCAST COMPLETE 〕━━━┈⊷
┃ 📤 Sent: ${sent} DMs
┃ ❌ Failed: ${failed} DMs
┃ 🧛 "The darkness has spoken."
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
