export default {
  name: 'ping',
  description: 'Check bot response time',
  category: 'utility',
  aliases: ['pong', 'latency'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const start = Date.now();
    
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🏓 PING 〕━━━┈⊷
┃ 
┃ 📡 Measuring latency...
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
    
    const latency = Date.now() - start;
    
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🏓 PONG 〕━━━┈⊷
┃ 
┃ ⚡ Latency: ${latency}ms
┃ 🧛 Status: ${latency < 200 ? '🟢 Excellent' : latency < 500 ? '🟡 Good' : '🔴 Slow'}
┃ 
┃ 🧛 "The darkness responds."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
