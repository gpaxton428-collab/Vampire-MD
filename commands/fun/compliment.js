export default {
  name: 'compliment',
  description: 'Get a compliment',
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

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 💬 COMPLIMENT 〕━━━┈⊷
┃ 
┃ ${compliments[Math.floor(Math.random() * compliments.length)]}
┃ 
┃ 🧛 "Even vampires need a boost."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
