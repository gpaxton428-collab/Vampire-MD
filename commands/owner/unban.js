import fs from 'fs';

export default {
  name: 'unban',
  description: 'Unblock a previously banned number',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const number = (args[0] || '').replace(/[^0-9]/g, '');
    if (!number) return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}unban <number>` }, { quoted: msg });
    let banned = [];
    try { banned = JSON.parse(fs.readFileSync('./data/banned.json', 'utf8')); } catch {}
    banned = banned.filter(n => n !== number);
    fs.writeFileSync('./data/banned.json', JSON.stringify(banned, null, 2));
    await sock.sendMessage(chatId, { text: `✅ ${number} unbanned.` }, { quoted: msg });
  }
};
