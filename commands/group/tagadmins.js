export default {
  name: 'tagadmins',
  description: 'Tag all admins in the group',
  category: 'group',
  aliases: ['admins', 'tagadmin'],
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
      const admins = groupMetadata.participants.filter(p => p.admin);
      const mentions = admins.map(p => p.id);

      if (admins.length === 0) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👑 ADMINS 〕━━━┈⊷
┃ No admins found in this group.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      const message = args.length > 0 ? args.join(' ') : 'Admins please check! 👑';

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 TAG ADMINS 〕━━━┈⊷
┃ ${message}
┃ 
┃ 📌 Admins: ${admins.length}
┃ 
┃ 🧛 "The coven leaders are called."
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
