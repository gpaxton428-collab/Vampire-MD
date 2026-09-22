import fs from 'fs';

function isRealOwner(msg, ctx) {
  const senderNumber = (msg.key.participant || msg.key.remoteJid || '').split('@')[0];
  return senderNumber === (ctx.OWNER_NUMBER || process.env.OWNER_NUMBER);
}

export default {
  name: 'addsudo',
  description: 'Grant owner-level access to a number',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg, args, prefix, ctx = {}) {
    const chatId = msg.key.remoteJid;
    let settings = {};
    try { settings = JSON.parse(fs.readFileSync('./bot_settings.json', 'utf8')); } catch {}
    if (settings.antiSudo && !isRealOwner(msg, ctx)) {
      return sock.sendMessage(chatId, { text: '❌ Anti-sudo is on — only the real owner can manage the sudo list.' }, { quoted: msg });
    }
    const number = (args[0] || '').replace(/[^0-9]/g, '');
    if (!number) return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}addsudo <number>` }, { quoted: msg });
    let sudo = [];
    try { sudo = JSON.parse(fs.readFileSync('./sudo.json', 'utf8')); if (!Array.isArray(sudo)) sudo = []; } catch {}
    if (!sudo.includes(number)) sudo.push(number);
    fs.writeFileSync('./sudo.json', JSON.stringify(sudo, null, 2));
    await sock.sendMessage(chatId, { text: `✅ ${number} added as sudo.` }, { quoted: msg });
  }
};
