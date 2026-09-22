export default {
  name: 'setprefix',
  description: 'Change the bot command prefix',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg, args, prefix, ctx = {}) {
    const chatId = msg.key.remoteJid;
    const newPrefix = args[0];
    if (!newPrefix) {
      return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}setprefix <symbol>` }, { quoted: msg });
    }
    if (ctx.updatePrefix) await ctx.updatePrefix(newPrefix);
    await sock.sendMessage(chatId, { text: `✅ Prefix updated to: ${newPrefix}` }, { quoted: msg });
  }
};
