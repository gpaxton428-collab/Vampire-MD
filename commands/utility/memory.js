export default {
  name: 'memory',
  description: 'Check bot memory usage',
  category: 'utility',
  aliases: ['mem', 'ram'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const memory = process.memoryUsage();

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 💾 MEMORY USAGE 〕━━━┈⊷
┃ 📊 RSS: ${(memory.rss / 1024 / 1024).toFixed(1)} MB
┃ 📊 Heap Used: ${(memory.heapUsed / 1024 / 1024).toFixed(1)} MB
┃ 📊 Heap Total: ${(memory.heapTotal / 1024 / 1024).toFixed(1)} MB
┃ 📊 External: ${(memory.external / 1024 / 1024).toFixed(1)} MB
┃ 🧛 "The darkness consumes."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
