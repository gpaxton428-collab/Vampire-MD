export default {
  name: 'compliment',
  description: 'Get a random compliment',
  category: 'fun',
  aliases: ['praise', 'nice'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

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
      "You're the best! 🏆"
    ];

    const compliment = compliments[Math.floor(Math.random() * compliments.length)];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 💬 COMPLIMENT 〕━━━┈⊷\n┃ \n┃ ${compliment}\n┃ \n┃ 🧛 "Even vampires need a boost sometimes."\n╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
