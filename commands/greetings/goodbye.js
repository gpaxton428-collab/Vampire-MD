export default {
  name: 'goodbye',
  description: 'Send goodbye message',
  category: 'greetings',
  aliases: ['gb', 'bye'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'everyone';

    const messages = [
      `👋 Goodbye ${target}! 🌙\n\nThe darkness awaits your return. Until we meet again, may the shadows protect you!\n\n🧛 "Farewell, for now."`,
      `🌚 Bye ${target}! 🦇\n\nThe night is calling, and we must answer. See you in the darkness!\n\n🦇 "Until we meet again."`,
      `👋 Farewell ${target}! ✨\n\nThe moon guides your path. May the darkness be your companion!\n\n⚡ "The night is yours."`,
      `🌙 Goodbye ${target}! 🩸\n\nYour journey continues in the night. May the shadows always be your ally!\n\n🧛 "We will meet again in the darkness."`,
      `👋 Bye ${target}! 🌑\n\nThe darkness embraces you as you go. Remember, the night always welcomes you back!\n\n🦇 "The coven awaits your return."`
    ];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 👋 GOODBYE 〕━━━┈⊷
┃ 
┃ ${messages[Math.floor(Math.random() * messages.length)]}
┃ 
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
