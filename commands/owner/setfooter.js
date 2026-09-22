export default {
  name: 'setfooter',
  description: 'Change the bot footer text',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const footer = args.join(' ');
    if (!footer) return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}setfooter <text>` }, { quoted: msg });
    process.env.BOT_FOOTER = footer;
    await sock.sendMessage(chatId, { text: `✅ Footer updated to: ${footer}` }, { quoted: msg });
  }
};
