import fs from 'fs';

export default {
  name: 'ban',
  description: 'Block the bot from responding to a number',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const number = (args[0] || '').replace(/[^0-9]/g, '');
    if (!number) return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}ban <number>` }, { quoted: msg });
    let banned = [];
    try { banned = JSON.parse(fs.readFileSync('./data/banned.json', 'utf8')); } catch {}
    if (!banned.includes(number)) banned.push(number);
    fs.writeFileSync('./data/banned.json', JSON.stringify(banned, null, 2));
    await sock.sendMessage(chatId, { text: `🚫 ${number} banned from using the bot.` }, { quoted: msg });
  }
};
