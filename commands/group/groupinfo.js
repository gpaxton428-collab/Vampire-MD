export default {
  name: 'groupinfo',
  description: 'Get group information',
  category: 'group',
  aliases: ['ginfo', 'gcinfo'],
  groupOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, { text: '❌ This command only works in groups.' }, { quoted: msg });
    }
    try {
      const metadata = await sock.groupMetadata(chatId);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👥 GROUP INFO 〕━━━┈⊷
┃ 📌 ${metadata.subject}
┃ 👥 Members: ${metadata.participants.length}
┃ 👑 Owner: ${metadata.owner || 'Unknown'}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, { text: `❌ ${error.message}` }, { quoted: msg });
    }
  }
};
