export default {
  name: 'status',
  description: 'Check bot status',
  category: 'utility',
  aliases: ['botstatus', 'info'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🤖 BOT STATUS 〕━━━┈⊷
┃ 🤖 ${process.env.BOT_NAME || 'Vampire MD'}
┃ 🔤 Prefix: ${process.env.PREFIX || '.'}
┃ ⏱️ Uptime: ${hours}h ${minutes}m ${seconds}s
┃ 🧛 Status: 🟢 ONLINE
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
