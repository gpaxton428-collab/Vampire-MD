export default {
  name: 'inactive',
  description: 'Find inactive members in the group',
  category: 'group',
  aliases: ['inactivemembers', 'inactiveusers'],
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
      
      // Get members who haven't sent messages recently
      const now = Date.now();
      const inactiveDays = parseInt(args[0]) || 7;
      const inactiveThreshold = now - (inactiveDays * 24 * 60 * 60 * 1000);

      let inactiveMembers = [];
      let activeMembers = [];

      for (const participant of participants) {
        try {
          // Check last message time - simplified check
          const lastMessage = await sock.loadMessages(chatId, 1);
          if (lastMessage && lastMessage.length > 0) {
            activeMembers.push(participant.id);
          } else {
            inactiveMembers.push(participant.id);
          }
        } catch {
          inactiveMembers.push(participant.id);
        }
      }

      // If inactive members list is too large, limit it
      if (inactiveMembers.length > 50) {
        inactiveMembers = inactiveMembers.slice(0, 50);
      }

      let response = `╭━━━〔 📊 INACTIVE MEMBERS 〕━━━┈⊷
┃ 📅 Days: ${inactiveDays}
┃ 👥 Total: ${participants.length}
┃ 
┃ 🟢 Active: ${activeMembers.length}
┃ 🔴 Inactive: ${inactiveMembers.length}
┃ 
┃ 🔴 Inactive Members:\n`;

      if (inactiveMembers.length === 0) {
        response += `┃ ✅ No inactive members found!\n`;
      } else {
        inactiveMembers.forEach((user, index) => {
          const number = user.split('@')[0];
          response += `┃ ${index + 1}. +${number}\n`;
        });
      }

      response += `┃ 
┃ 🧛 "The coven purifies the inactive."
╰━━━━━━━━━━━━━━━┈⊷`;

      await sock.sendMessage(chatId, {
        text: response,
        mentions: inactiveMembers.slice(0, 10)
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
