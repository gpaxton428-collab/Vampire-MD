export default {
  name: '8ball',
  description: 'Ask the magic 8Ball a question',
  category: 'fun',
  aliases: ['magic', 'fortune'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const question = args.join(' ');

    if (!question) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔮 8BALL 〕━━━┈⊷\n┃ Ask me a question!\n┃ \n┃ Example: ${prefix}8ball Will I be rich?\n╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const responses = [
      "Yes, definitely!",
      "No, not today.",
      "Maybe, ask again later.",
      "Absolutely!",
      "I wouldn't count on it.",
      "Yes, but be patient.",
      "The stars say yes.",
      "No, and don't ask again.",
      "Perhaps...",
      "Without a doubt!",
      "My sources say no.",
      "Yes, go for it!",
      "Not looking good.",
      "It is certain.",
      "Very doubtful."
    ];

    const answer = responses[Math.floor(Math.random() * responses.length)];
    const emojis = ['🔮', '✨', '🌟', '💫', '🌙'];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🔮 8BALL 〕━━━┈⊷\n┃ Question: ${question}\n┃ \n┃ ${emojis[Math.floor(Math.random() * emojis.length)]} Answer: *${answer}*\n╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
