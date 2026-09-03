export default {
  name: 'flip',
  description: 'Flip a coin',
  category: 'fun',
  aliases: ['coin', 'toss'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const result = Math.random() < 0.5 ? 'HEAD' : 'TAILS';
    const emoji = result === 'HEAD' ? '🪙' : '🪙';

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🪙 COIN FLIP 〕━━━┈⊷\n┃ \n┃ 🎯 Result: *${result}*\n┃ \n┃ ${emoji} The coin has spoken!\n╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
