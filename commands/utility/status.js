import fs from 'fs';

export default {
  name: 'status',
  description: 'Check bot status',
  category: 'utility',
  aliases: ['botstatus', 'info'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const botName = process.env.BOT_NAME || 'Vampire MD';
    const prefixCurrent = process.env.PREFIX || '.';
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const memory = process.memoryUsage();

    // Count commands
    let commandCount = 0;
    try {
      const commandFolders = fs.readdirSync('./commands').filter(f => fs.statSync(`./commands/${f}`).isDirectory());
      commandFolders.forEach(dir => {
        const files = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith('.js'));
        commandCount += files.length;
      });
    } catch {}

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🤖 BOT STATUS 〕━━━┈⊷
┃ 
┃ 📛 Name: ${botName}
┃ 🔤 Prefix: ${prefixCurrent}
┃ 📊 Commands: ${commandCount}
┃ 
┃ ⏱️ Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s
┃ 
┃ 💾 Memory: ${(memory.rss / 1024 / 1024).toFixed(1)} MB
┃ 
┃ 🌐 Status: 🟢 ONLINE
┃ 
┃ 🧛 "The darkness is alive."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
