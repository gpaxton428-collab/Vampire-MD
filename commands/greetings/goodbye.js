export default {
  name: 'goodbye',
  description: 'Send a goodbye message',
  category: 'greetings',
  aliases: ['gb', 'bye'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'everyone';

    const messages = [
      `👋 Goodbye ${target}! 🌙\n\nThe darkness awaits your return. Until we meet again, may the shadows protect you!\n\n🧛 "Farewell, for now."`,
      `🌚 Bye ${target}! 🦇\n\nThe night is calling, and we must answer. See you in the darkness!\n\n🦇 "Until we meet again."`,
      `👋 Farewell ${target}! ✨\n\nThe moon guides your path. May the darkness be your companion!\n\n⚡ "The night is yours."`
    ];

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 👋 GOODBYE 〕━━━┈⊷
┃ 
┃ ${randomMsg}
┃ 
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
