import fs from 'fs';

export default {
  name: 'setbotname',
  description: 'Change the bot display name',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const name = args.join(' ');
    if (!name) return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}setbotname <name>` }, { quoted: msg });
    process.env.BOT_NAME = name;
    try {
      const settings = JSON.parse(fs.readFileSync('./bot_settings.json', 'utf8'));
      settings.botName = name;
      fs.writeFileSync('./bot_settings.json', JSON.stringify(settings, null, 2));
    } catch {}
    await sock.sendMessage(chatId, { text: `✅ Bot name set to: ${name}` }, { quoted: msg });
  }
};
