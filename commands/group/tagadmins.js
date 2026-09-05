export default {
  name: 'tagadmins',
  description: 'Tag all admins',
  category: 'group',
  aliases: ['admins', 'tagadmin'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const metadata = await sock.groupMetadata(chatId);
      const admins = metadata.participants.filter(p => p.admin);
      const mentions = admins.map(p => p.id);

      if (admins.length === 0) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 👑 ADMINS 〕━━━┈⊷
┃ No admins found.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      const message = args.join(' ') || 'Admins please check! 👑';

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 TAG ADMINS 〕━━━┈⊷
┃ ${message}
┃ 📌 ${admins.length} admins
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
