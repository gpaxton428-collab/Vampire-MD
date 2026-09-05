export default {
  name: 'broadcast',
  description: 'Send message to all chats',
  category: 'owner',
  aliases: ['bc', 'announce'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const message = args.join(' ');
    if (!message) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📢 BROADCAST 〕━━━┈⊷
┃ Usage: ${prefix}broadcast <message>
┃ 
┃ Example: ${prefix}broadcast Bot will be down
┃ 🧛 "Speak to the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
    await sock.sendMessage(chatId, { text: '📢 Broadcasting...' }, { quoted: msg });
    const chats = await sock.chats();
    let sent = 0;
    for (const chat of chats) {
      try {
        await sock.sendMessage(chat.id, { text: `📢 ${message}` });
        sent++;
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch {}
    }
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ BROADCAST COMPLETE 〕━━━┈⊷
┃ 📤 Sent to ${sent} chats
┃ 🧛 "The darkness has spoken."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
