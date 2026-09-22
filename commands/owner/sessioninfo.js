import fs from 'fs';

export default {
  name: 'sessioninfo',
  description: 'Show basic session status (no secrets are printed)',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg) {
    const chatId = msg.key.remoteJid;
    const exists = fs.existsSync('./session/creds.json');
    await sock.sendMessage(chatId, {
      text: `📂 *Session Status*\n${exists ? '✅ Linked session found on disk.' : '❌ No session found.'}\n\n⚠️ Never share your session files or session ID — anyone with them can control this WhatsApp account.`
    }, { quoted: msg });
  }
};
