export default {
  name: 'setdesc',
  description: 'Set group description',
  category: 'group',
  aliases: ['setgroupdesc', 'groupdesc'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const desc = args.join(' ');

    if (!desc) {
      const metadata = await sock.groupMetadata(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📝 GROUP DESCRIPTION 〕━━━┈⊷
┃ Current: ${metadata.desc || 'No description'}
┃ 
┃ Usage: ${prefix}setdesc <description>
┃ 🧛 "Write the coven's lore."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      await sock.groupUpdateDescription(chatId, desc);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ DESCRIPTION UPDATED 〕━━━┈⊷
┃ ${desc}
┃ 🧛 "The lore is written."
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
