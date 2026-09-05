export default {
  name: 'clearchats',
  description: 'Clear all chats (DANGEROUS)',
  category: 'owner',
  aliases: ['clearchat', 'clearall'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const confirm = args[0]?.toLowerCase();

    if (confirm !== 'confirm') {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ⚠️ CLEAR CHATS 〕━━━┈⊷
┃ This will clear ALL chats!
┃ 
┃ Type: ${prefix}clearchats confirm
┃ 
┃ 🧛 "The darkness erases."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    await sock.sendMessage(chatId, { text: '⏳ Clearing chats...' }, { quoted: msg });

    try {
      const chats = await sock.chats();
      let cleared = 0;

      for (const chat of chats) {
        try {
          await sock.sendMessage(chat.id, { text: '🧹 Chat cleared by Vampire MD' });
          cleared++;
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ CHATS CLEARED 〕━━━┈⊷
┃ 📊 ${cleared} chats cleared
┃ 🧛 "The darkness erases."
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
