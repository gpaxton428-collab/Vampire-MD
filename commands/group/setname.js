export default {
  name: 'setname',
  description: 'Set group name',
  category: 'group',
  aliases: ['setgroupname', 'groupname'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const name = args.join(' ');

    if (!name) {
      const metadata = await sock.groupMetadata(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📛 GROUP NAME 〕━━━┈⊷
┃ Current: ${metadata.subject || 'Unknown'}
┃ 
┃ Usage: ${prefix}setname <new name>
┃ 🧛 "Rename the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      await sock.groupUpdateSubject(chatId, name);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ NAME UPDATED 〕━━━┈⊷
┃ New Name: ${name}
┃ 🧛 "The coven has a new name."
╰━━━━━━━━━━━━━━━┈⊷`
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
