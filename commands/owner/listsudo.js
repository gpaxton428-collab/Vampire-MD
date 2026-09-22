import fs from 'fs';

export default {
  name: 'listsudo',
  description: 'List numbers with owner-level access',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg) {
    const chatId = msg.key.remoteJid;
    let sudo = [];
    try { sudo = JSON.parse(fs.readFileSync('./sudo.json', 'utf8')); if (!Array.isArray(sudo)) sudo = []; } catch {}
    const text = sudo.length ? sudo.map((n, i) => `${i + 1}. ${n}`).join('\n') : 'No sudo numbers set.';
    await sock.sendMessage(chatId, { text: `👑 *Sudo List*\n${text}` }, { quoted: msg });
  }
};
