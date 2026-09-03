export default {
  name: 'acceptall',
  description: 'Accept all pending join requests',
  category: 'group',
  aliases: ['aa', 'approveall'],
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
      const requests = await sock.groupRequestParticipantsList(chatId);
      
      if (!requests || requests.length === 0) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 JOIN REQUESTS 〕━━━┈⊷
┃ No pending join requests.
┃ 
┃ 🧛 "The coven is peaceful."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      let accepted = 0;
      for (const req of requests) {
        try {
          await sock.groupRequestParticipantsUpdate(chatId, [req.jid], 'approve');
          accepted++;
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ACCEPT ALL 〕━━━┈⊷
┃ ${accepted} members accepted.
┃ Total requests: ${requests.length}
┃ 
┃ 🧛 "The coven grows."
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
