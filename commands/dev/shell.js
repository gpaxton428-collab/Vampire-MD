import { exec } from 'child_process';

export default {
  name: 'shell',
  description: 'Run a whitelisted read-only shell command on the host (dev tool)',
  category: 'dev',
  alias: ['$'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const allowed = ['pwd', 'ls', 'node -v', 'npm -v', 'df -h', 'free -m', 'whoami', 'date'];
    const cmd = args.join(' ');
    if (!allowed.includes(cmd)) {
      return sock.sendMessage(chatId, { text: `❌ Only these read-only commands are allowed:\n${allowed.map(c => `• ${c}`).join('\n')}` }, { quoted: msg });
    }
    exec(cmd, { timeout: 15000 }, async (err, stdout, stderr) => {
      const out = err ? (stderr || err.message) : (stdout || '(no output)');
      await sock.sendMessage(chatId, { text: `\`\`\`${out}\`\`\`` }, { quoted: msg });
    });
  }
};
