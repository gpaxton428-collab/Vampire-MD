export default {
  name: 'acceptall',
  description: 'Accept all pending join requests',
  category: 'group',
  aliases: ['aa', 'approveall'],
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

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ACCEPTING ALL 〕━━━┈⊷
┃ 📊 ${requests.length} requests found.
┃ ⏳ Accepting...
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });

      let accepted = 0;
      let failed = 0;

      for (const req of requests) {
        try {
          await sock.groupRequestParticipantsUpdate(chatId, [req.jid], 'approve');
          accepted++;
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch {
          failed++;
        }
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ACCEPT ALL COMPLETE 〕━━━┈⊷
┃ ✅ Accepted: ${accepted}
┃ ❌ Failed: ${failed}
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
