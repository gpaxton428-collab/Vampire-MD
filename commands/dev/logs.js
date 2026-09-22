import fs from 'fs';

export default {
  name: 'logs',
  description: 'Show the last lines of the process log file, if present',
  category: 'dev',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const logFile = './bot.log';
    if (!fs.existsSync(logFile)) {
      return sock.sendMessage(chatId, { text: 'ℹ️ No log file found. On Render/Railway/Koyeb, view logs from the platform dashboard instead.' }, { quoted: msg });
    }
    const lines = fs.readFileSync(logFile, 'utf8').trim().split('\n').slice(-30).join('\n');
    await sock.sendMessage(chatId, { text: `📄 *Last 30 log lines:*\n\`\`\`${lines}\`\`\`` }, { quoted: msg });
  }
};
