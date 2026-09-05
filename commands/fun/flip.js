export default {
  name: 'flip',
  description: 'Flip a coin',
  category: 'fun',
  aliases: ['coin', 'toss'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const result = Math.random() < 0.5 ? 'HEADS' : 'TAILS';

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🪙 COIN FLIP 〕━━━┈⊷
┃ 🎯 Result: *${result}*
┃ 🧛 "The coin has spoken."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
