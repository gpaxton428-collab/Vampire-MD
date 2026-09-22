import fs from 'fs';

export default {
  name: 'antisudo',
  description: 'Lock the sudo list so only the real owner (not other sudo users) can change it',
  category: 'settings',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const state = (args[0] || '').toLowerCase();
    if (!['on', 'off'].includes(state)) {
      return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}antisudo <on|off>` }, { quoted: msg });
    }
    let settings = {};
    try { settings = JSON.parse(fs.readFileSync('./bot_settings.json', 'utf8')); } catch {}
    settings.antiSudo = state === 'on';
    fs.writeFileSync('./bot_settings.json', JSON.stringify(settings, null, 2));
    await sock.sendMessage(chatId, {
      text: `✅ Anti-sudo turned ${state}.\n${state === 'on' ? 'Only the real owner number can now use .addsudo/.removesudo.' : 'Sudo users can manage the sudo list again.'}`
    }, { quoted: msg });
  }
};
