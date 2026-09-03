export default {
  name: 'random',
  description: 'Generate random number',
  category: 'fun',
  aliases: ['rand', 'roll'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    let min = parseInt(args[0]) || 1;
    let max = parseInt(args[1]) || 100;

    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }

    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🎲 RANDOM NUMBER 〕━━━┈⊷\n┃ Range: ${min} - ${max}\n┃ \n┃ 🎯 Result: *${randomNum}*\n╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
