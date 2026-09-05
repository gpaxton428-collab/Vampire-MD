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
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ⏰ UPTIME 〕━━━┈⊷
┃ ⏱️ ${days}d ${hours}h ${minutes}m ${seconds}s
┃ 🧛 "The darkness never sleeps."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
