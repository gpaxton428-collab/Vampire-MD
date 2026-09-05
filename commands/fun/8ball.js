export default {
  name: '8ball',
  description: 'Ask the magic 8Ball',
  category: 'fun',
  aliases: ['magic', 'fortune'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const question = args.join(' ') || 'Will I be lucky?';
    const answers = ['Yes!', 'No.', 'Maybe...', 'Definitely!', 'Never.', 'Ask again later.'];
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🔮 8BALL 〕━━━┈⊷
┃ Question: ${question}
┃ Answer: ${answers[Math.floor(Math.random() * answers.length)]}
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
