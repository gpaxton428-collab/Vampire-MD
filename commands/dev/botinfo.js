export default {
  name: 'botinfo',
  description: 'Show runtime / environment info for debugging',
  category: 'dev',
  alias: ['sysinfo'],
  ownerOnly: true,
  async execute(sock, msg) {
    const chatId = msg.key.remoteJid;
    const mem = process.memoryUsage();
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🧑‍💻 DEV INFO 〕━━━┈⊷
┃ Node: ${process.version}
┃ Platform: ${process.platform}
┃ Uptime: ${Math.floor(process.uptime())}s
┃ RSS: ${(mem.rss / 1024 / 1024).toFixed(1)}MB
┃ Heap: ${(mem.heapUsed / 1024 / 1024).toFixed(1)}MB
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
