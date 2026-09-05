export default {
  name: 'speed',
  description: 'Check bot speed',
  category: 'utility',
  aliases: ['speedtest', 'latency'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const start = Date.now();

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ⚡ SPEED TEST 〕━━━┈⊷
┃ 📡 Measuring...
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    const latency = Date.now() - start;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ⚡ SPEED RESULT 〕━━━┈⊷
┃ ⏱️ Latency: ${latency}ms
┃ 📊 Status: ${latency < 200 ? '🟢 Excellent' : latency < 500 ? '🟡 Good' : '🔴 Slow'}
┃ 🧛 "The darkness responds."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
