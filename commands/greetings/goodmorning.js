export default {
  name: 'goodmorning',
  description: 'Send good morning message',
  category: 'greetings',
  aliases: ['gm', 'morning'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'everyone';

    const messages = [
      `🌅 Good Morning ${target}! ☀️\n\nWake up, the darkness has lifted. A new day rises. Let the vampire inside you shine bright today!\n\n🧛 "The sun rises, but we still stand."`,
      `🌄 Rise and shine ${target}! 🌞\n\nThe night is over, but the darkness lives in our hearts. Have a blessed day!\n\n🦇 "Even vampires appreciate a good morning."`,
      `🌤️ Good Morning ${target}! ✨\n\nMay your coffee be strong and your enemies weaker. The dawn is yours to conquer!\n\n⚡ "Strength through darkness."`,
      `☀️ Morning ${target}! 🌺\n\nWake up, stretch, and embrace the light. The vampire inside you is ready for the day!\n\n🧛 "In the light, we find our power."`,
      `🌅 Rise and conquer ${target}! 🦇\n\nAnother day, another opportunity to rise above. Let the darkness fuel your fire!\n\n🔥 "The night is gone, but the vampire lives."`,
      `🌄 Good Morning ${target}! 💫\n\nThe sun shines bright, but our shadows remain. Make today unforgettable!\n\n✨ "Darkness gives us strength."`,
      `☀️ Good Morning ${target}! 🌿\n\nWake up and embrace the day. Your potential is as vast as the night sky!\n\n🌙 "We are the creatures of the night, but we also love the dawn."`
    ];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🌅 GOOD MORNING 〕━━━┈⊷
┃ 
┃ ${messages[Math.floor(Math.random() * messages.length)]}
┃ 
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
