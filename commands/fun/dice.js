export default {
  name: 'dice',
  description: 'Roll a dice',
  category: 'fun',
  aliases: ['roll'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const sides = parseInt(args[0]) || 6;

    if (sides < 2 || sides > 100) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🎲 DICE 〕━━━┈⊷\n┃ Please use 2-100 sides\n┃ \n┃ Example: ${prefix}dice 20\n╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const result = Math.floor(Math.random() * sides) + 1;
    const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🎲 DICE ROLL 〕━━━┈⊷\n┃ Sides: ${sides}\n┃ \n┃ ${diceEmojis[Math.min(result - 1, 5)]} Result: *${result}*\n╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
