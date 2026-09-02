export default {
  name: 'groupinfo',
  description: 'Get group information',
  category: 'group',
  aliases: ['ginfo', 'gcinfo'],
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
      
      const admins = participants.filter(p => p.admin);
      const members = participants.filter(p => !p.admin);

      let info = `╭━━━〔 👥 GROUP INFO 〕━━━┈⊷
┃ 📌 Name: ${groupMetadata.subject || 'Unknown'}
┃ 👤 Owner: ${groupMetadata.owner || 'Unknown'}
┃ 📅 Created: ${groupMetadata.creation ? new Date(groupMetadata.creation * 1000).toLocaleDateString() : 'Unknown'}
┃ 
┃ 📊 Members:
┃   ├─ Total: ${participants.length}
┃   ├─ Admins: ${admins.length}
┃   └─ Members: ${members.length}
┃ 
┃ 🔗 Description: ${groupMetadata.desc || 'No description'}
┃ 
┃ 🧛 "The coven stands united."
╰━━━━━━━━━━━━━━━┈⊷`;

      await sock.sendMessage(chatId, {
        text: info
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
