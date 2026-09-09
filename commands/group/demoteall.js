export default {
  name: 'demoteall',
  description: 'Demote all admins',
  category: 'group',
  aliases: ['removealladmin'],
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
        text: `╭━━━〔 ⚠️ DEMOTE ALL 〕━━━┈⊷
┃ This will demote ALL admins!
┃ 
┃ Type: ${prefix}demoteall confirm
┃ 
┃ 🧛 "Power taken."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const metadata = await sock.groupMetadata(chatId);
      const admins = metadata.participants.filter(p => p.admin).map(p => p.id);

      if (admins.length === 0) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 NO ADMINS 〕━━━┈⊷
┃ No admins to demote.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔥 DEMOTING ADMINS 〕━━━┈⊷
┃ Demoting ${admins.length} admins...
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });

      let demoted = 0;
      for (const admin of admins) {
        try {
          await sock.groupParticipantsUpdate(chatId, [admin], 'demote');
          demoted++;
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ DEMOTION COMPLETE 〕━━━┈⊷
┃ ${demoted} admins demoted!
┃ 🧛 "Power reclaimed."
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
