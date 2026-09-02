export default {
  name: 'demoteall',
  description: 'Demote all admins except owner',
  category: 'group',
  aliases: ['removealladmin'],
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

    const confirm = args[0]?.toLowerCase();
    
    if (confirm !== 'confirm') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ⚠️ DEMOTE ALL 〕━━━┈⊷
┃ This will demote ALL admins!
┃ 
┃ Type: ${prefix}demoteall confirm
┃ 
┃ 🧛 "Power taken."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      const groupMetadata = await sock.groupMetadata(chatId);
      const participants = groupMetadata.participants;
      
      const owner = groupMetadata.owner;
      const admins = participants.filter(p => p.admin && p.id !== owner).map(p => p.id);

      if (admins.length === 0) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 NO ADMINS 〕━━━┈⊷
┃ No admins to demote.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
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
┃ ${demoted} admins demoted.
┃ 
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
