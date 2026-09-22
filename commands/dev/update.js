import { exec } from 'child_process';

export default {
  name: 'update',
  description: 'Pull the latest code from the configured git repo',
  category: 'dev',
  ownerOnly: true,
  async execute(sock, msg) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { text: '⬇️ Pulling latest changes...' }, { quoted: msg });
    exec('git pull', { timeout: 60000 }, async (err, stdout, stderr) => {
      const out = err ? (stderr || err.message) : stdout || 'Already up to date.';
      await sock.sendMessage(chatId, { text: `${err ? '❌' : '✅'} *Update result:*\n\`\`\`${out}\`\`\`` }, { quoted: msg });
    });
  }
};
