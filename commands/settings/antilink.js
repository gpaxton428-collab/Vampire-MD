import fs from 'fs';

export default {
  name: 'antilink',
  description: 'Toggle group anti-link protection',
  category: 'settings',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const state = (args[0] || '').toLowerCase();
    if (!['on', 'off'].includes(state)) return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}antilink <on|off>` }, { quoted: msg });
    let settings = {};
    try { settings = JSON.parse(fs.readFileSync('./bot_settings.json', 'utf8')); } catch {}
    settings.antiLink = state === 'on';
    fs.writeFileSync('./bot_settings.json', JSON.stringify(settings, null, 2));
    await sock.sendMessage(chatId, { text: `✅ Anti-link turned ${state}.` }, { quoted: msg });
  }
};
