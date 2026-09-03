export default {
  name: 'checkowner',
  description: 'Check if you are the bot owner',
  category: 'owner',
  aliases: ['amowner', 'ownercheck'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const isOwner = jidManager.isOwner(msg);

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 👑 OWNER CHECK 〕━━━┈⊷
┃ 
┃ ${isOwner ? '✅ You are the BOT OWNER!' : '❌ You are NOT the bot owner'}
┃ 
┃ 📌 Owner: +${process.env.OWNER_NUMBER || '27797352930'}
┃ 
┃ 🧛 "${isOwner ? 'Welcome back, master.' : 'The darkness does not recognize you.'}"
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
