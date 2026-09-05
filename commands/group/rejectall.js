export default {
  name: 'rejectall',
  description: 'Reject all pending join requests',
  category: 'group',
  aliases: ['ra', 'denyall'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const confirm = args[0]?.toLowerCase();

    if (confirm !== 'confirm') {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ⚠️ REJECT ALL 〕━━━┈⊷
┃ This will reject ALL pending join requests!
┃ 
┃ Type: ${prefix}rejectall confirm
┃ 
┃ 🧛 "The darkness denies."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const requests = await sock.groupRequestParticipantsList(chatId);

      if (!requests || requests.length === 0) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 PENDING REQUESTS 〕━━━┈⊷
┃ No pending join requests.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ REJECTING ALL 〕━━━┈⊷
┃ 📊 ${requests.length} requests found.
┃ ⏳ Rejecting...
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });

      let rejected = 0;
      let failed = 0;

      for (const req of requests) {
        try {
          await sock.groupRequestParticipantsUpdate(chatId, [req.jid], 'reject');
          rejected++;
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch {
          failed++;
        }
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ REJECT ALL COMPLETE 〕━━━┈⊷
┃ ❌ Rejected: ${rejected}
┃ ❌ Failed: ${failed}
┃ 🧛 "The darkness denies."
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
