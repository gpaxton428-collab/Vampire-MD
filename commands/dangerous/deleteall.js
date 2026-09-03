export default {
  name: 'deleteall',
  description: 'Delete all messages in a chat',
  category: 'dangerous',
  aliases: ['clearall', 'purgeall'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ DELETE ALL 〕━━━┈⊷
┃ Delete all messages in a chat.
┃ 
┃ Usage: ${prefix}deleteall <chat_jid>
┃ 
┃ ⚠️ This will delete ALL messages!
┃ 🧛 "The darkness erases."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const chatJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ DELETING ALL 〕━━━┈⊷
┃ 👤 Target: ${chatJid}
┃ 
┃ ⚠️ This will delete ALL messages!
┃ 🧛 "The darkness consumes..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    // This is a dangerous command - use with caution
    try {
      const messages = await sock.loadMessages(chatJid, 100);
      for (const msg of messages) {
        try {
          await sock.sendMessage(chatJid, { delete: msg.key });
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ DELETE COMPLETE 〕━━━┈⊷
┃ 📤 All messages deleted from ${chatJid}
┃ 
┃ 🧛 "The darkness has erased."
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
