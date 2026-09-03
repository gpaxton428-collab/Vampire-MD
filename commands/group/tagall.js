export default {
  name: 'tagall',
  description: 'Tag all members in the group',
  category: 'group',
  aliases: ['everyone', 'all'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    if (!chatId.endsWith('@g.us')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      const groupMetadata = await sock.groupMetadata(chatId);
      const participants = groupMetadata.participants;
      const mentions = participants.map(p => p.id);

      const message = args.length > 0 ? args.join(' ') : 'Attention everyone! 🧛';

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📢 TAG ALL 〕━━━┈⊷
┃ ${message}
┃ 
┃ 📌 Total: ${participants.length} members
┃ 
┃ 🧛 "The coven calls upon you."
╰━━━━━━━━━━━━━━━┈⊷`,
        mentions: mentions
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
