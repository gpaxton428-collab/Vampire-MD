export default {
  name: 'uptime',
  description: 'Check bot uptime',
  category: 'utility',
  aliases: ['up', 'runtime'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const memory = process.memoryUsage();

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ⏰ UPTIME 〕━━━┈⊷
┃ 
┃ ⏱️ ${days}d ${hours}h ${minutes}m ${seconds}s
┃ 
┃ 💾 Memory:
┃   ├─ RSS: ${(memory.rss / 1024 / 1024).toFixed(1)} MB
┃   ├─ Heap: ${(memory.heapUsed / 1024 / 1024).toFixed(1)} MB
┃   └─ External: ${(memory.external / 1024 / 1024).toFixed(1)} MB
┃ 
┃ 🧛 "The darkness never sleeps."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
