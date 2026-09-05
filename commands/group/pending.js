export default {
  name: 'pending',
  description: 'List all pending join requests',
  category: 'group',
  aliases: ['pendinglist', 'requests'],
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
      const requests = await sock.groupRequestParticipantsList(chatId);

      if (!requests || requests.length === 0) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 PENDING REQUESTS 〕━━━┈⊷
┃ No pending join requests.
┃ 🧛 "The coven is peaceful."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      let list = `╭━━━〔 📋 PENDING REQUESTS 〕━━━┈⊷\n`;
      requests.forEach((req, index) => {
        const num = req.jid?.split('@')[0] || 'Unknown';
        list += `┃ ${index + 1}. +${num}\n`;
      });
      list += `┃ \n┃ 📊 Total: ${requests.length}\n`;
      list += `┃ 
┃ 📌 Commands:
┃ ${prefix}acceptall - Accept all
┃ ${prefix}rejectall confirm - Reject all
┃ 
┃ 🧛 "The darkness watches."
╰━━━━━━━━━━━━━━━┈⊷`;

      await sock.sendMessage(chatId, { text: list }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
