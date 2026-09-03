export default {
  name: 'setname',
  description: 'Set group name',
  category: 'group',
  aliases: ['setgroupname', 'groupname'],
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

    const newName = args.join(' ');

    if (!newName) {
      const groupMetadata = await sock.groupMetadata(chatId);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📛 GROUP NAME 〕━━━┈⊷
┃ Current Name: ${groupMetadata.subject}
┃ 
┃ Usage: ${prefix}setname <new name>
┃ 
┃ Example: ${prefix}setname Vampire Coven
┃ 
┃ 🧛 "Rename the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (newName.length > 25) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Name too long! Max 25 characters.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      await sock.groupUpdateSubject(chatId, newName);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ GROUP NAME UPDATED 〕━━━┈⊷
┃ New Name: ${newName}
┃ 
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
