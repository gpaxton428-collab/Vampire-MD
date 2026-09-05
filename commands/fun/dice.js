export default {
  name: 'dice',
  description: 'Roll a dice',
  category: 'fun',
  aliases: ['roll', 'diceroll'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const sides = parseInt(args[0]) || 6;

    if (sides < 2 || sides > 100) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Use 2-100 sides.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const result = Math.floor(Math.random() * sides) + 1;
    const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🎲 DICE ROLL 〕━━━┈⊷
┃ Sides: ${sides}
┃ ${diceEmojis[Math.min(result - 1, 5)]} Result: *${result}*
┃ 🧛 "The dice have spoken."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
