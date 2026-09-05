export default {
  name: 'ping',
  description: 'Check bot response time',
  category: 'utility',
  aliases: ['pong', 'latency'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const start = Date.now();
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🏓 PONG 〕━━━┈⊷
┃ ⚡ Latency: ${Date.now() - start}ms
┃ 🧛 Status: 🟢 ONLINE
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
