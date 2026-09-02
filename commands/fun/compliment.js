export default {
  name: 'compliment',
  description: 'Get a random compliment',
  category: 'fun',
  aliases: ['praise', 'nice'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'you';

    const compliments = [
      "You're awesome! 🌟",
      "You have a great smile! 😊",
      "You're so creative! 🎨",
      "You're a true friend! 🤝",
      "You're doing great! 💪",
      "You're so kind! 💕",
      "You're incredibly smart! 🧠",
      "You're so brave! 🦁",
      "You're amazing! ✨",
      "You're so funny! 😂",
      "You're one of a kind! 🌈",
      "You're so talented! 🎭",
      "You're beautiful/handsome! 😍",
      "You're a legend! 👑",
      "You're the best! 🏆",
      "You're so caring! 💖",
      "You're full of potential! 🚀",
      "You light up the room! 💡",
      "You're so charismatic! 🎤",
      "You're a ray of sunshine! ☀️",
      "You're so thoughtful! 💭",
      "You're incredibly strong! 💪",
      "You're so charming! 😘",
      "You're a masterpiece! 🎨",
      "You're so inspiring! 🌟",
      "You're a blessing! 🙏",
      "You're so unique! 🌺",
      "You're fearless! 🦅",
      "You're so passionate! 🔥",
      "You're unforgettable! 💫"
    ];

    const compliment = compliments[Math.floor(Math.random() * compliments.length)];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 💬 COMPLIMENT 〕━━━┈⊷
┃ @${target} ${compliment}
┃ 
┃ 🧛 "Even vampires need a boost sometimes."
╰━━━━━━━━━━━━━━━┈⊷`,
      mentions: [msg.key.participant || msg.key.remoteJid]
    }, { quoted: msg });
  }
};
