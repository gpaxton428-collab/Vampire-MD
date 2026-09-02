export default {
  name: 'setdesc',
  description: 'Set group description',
  category: 'group',
  aliases: ['setgroupdesc', 'groupdesc'],
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

    const newDesc = args.join(' ');

    if (!newDesc) {
      const groupMetadata = await sock.groupMetadata(chatId);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📝 GROUP DESCRIPTION 〕━━━┈⊷
┃ Current Description: ${groupMetadata.desc || 'No description'}
┃ 
┃ Usage: ${prefix}setdesc <description>
┃ 
┃ Example: ${prefix}setdesc Welcome to the Vampire Coven
┃ 
┃ 🧛 "Write the coven's lore."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (newDesc.length > 500) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Description too long! Max 500 characters.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      await sock.groupUpdateDescription(chatId, newDesc);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ DESCRIPTION UPDATED 〕━━━┈⊷
┃ ${newDesc}
┃ 
┃ 🧛 "The coven's lore is written."
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
