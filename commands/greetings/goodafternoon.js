export default {
  name: 'goodafternoon',
  description: 'Send good afternoon message',
  category: 'greetings',
  aliases: ['ga', 'afternoon'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'everyone';

    const messages = [
      `🌤️ Good Afternoon ${target}! ☀️\n\nThe sun is high, but our shadows are long. Take a break, relax, and let the darkness recharge you!\n\n🧛 "Even vampires need a midday rest."`,
      `☀️ Afternoon ${target}! 🌿\n\nThe day is at its peak, but our power only grows. Stay strong and keep moving forward!\n\n🦇 "Power grows with the sun."`,
      `🌤️ Good Afternoon ${target}! ✨\n\nThe light is bright, but our hearts are dark. Embrace the day and let the vampire inside guide you!\n\n⚡ "Strength in every shadow."`,
      `☀️ Afternoon ${target}! 🌺\n\nThe sun is shining, and so are you. Keep pushing through the day with vampire strength!\n\n🧛 "We rule the day as we rule the night."`,
      `🌤️ Good Afternoon ${target}! 💫\n\nThe day moves on, but the darkness remains. Make the most of your afternoon!\n\n🔥 "The night is coming, but the day is ours."`
    ];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🌤️ GOOD AFTERNOON 〕━━━┈⊷
┃ 
┃ ${messages[Math.floor(Math.random() * messages.length)]}
┃ 
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
