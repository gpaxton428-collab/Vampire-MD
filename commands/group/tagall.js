export default {
  name: 'tagall',
  description: 'Tag all members',
  category: 'group',
  aliases: ['everyone', 'all'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, { text: '❌ This command only works in groups.' }, { quoted: msg });
    }
    try {
      const metadata = await sock.groupMetadata(chatId);
      const mentions = metadata.participants.map(p => p.id);
      const message = args.join(' ') || 'Attention everyone! 🧛';
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📢 TAG ALL 〕━━━┈⊷
┃ ${message}
┃ 👥 ${mentions.length} members
╰━━━━━━━━━━━━━━━┈⊷`,
        mentions: mentions
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, { text: `❌ ${error.message}` }, { quoted: msg });
    }
  }
};
