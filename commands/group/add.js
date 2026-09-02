export default {
  name: 'add',
  description: 'Add a member to the group',
  category: 'group',
  aliases: ['invite'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    // Check if it's a group
    if (!chatId.endsWith('@g.us')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const number = args[0];
    if (!number) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👥 ADD MEMBER 〕━━━┈⊷
┃ Usage: ${prefix}add 27797352930
┃ 
┃ Example: ${prefix}add 27797352930
┃ 
┃ 🧛 "Welcome to the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      const jid = number.includes('@') ? number : `${number}@s.whatsapp.net`;
      await sock.groupParticipantsUpdate(chatId, [jid], 'add');
      
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ADDED 〕━━━┈⊷
┃ 👤 ${number} has been added to the group.
┃ 
┃ 🧛 "A new vampire joins the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to add user: ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
