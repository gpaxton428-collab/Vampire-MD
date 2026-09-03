export default {
  name: 'promoteall',
  description: 'Promote all members to admin',
  category: 'group',
  aliases: ['makealladmin'],
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
        text: `╭━━━〔 ⚠️ PROMOTE ALL 〕━━━┈⊷
┃ This will promote ALL members to admin!
┃ 
┃ Type: ${prefix}promoteall confirm
┃ 
┃ 🧛 "Power to the people."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      const groupMetadata = await sock.groupMetadata(chatId);
      const participants = groupMetadata.participants;
      const members = participants.filter(p => !p.admin).map(p => p.id);

      if (members.length === 0) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 NO MEMBERS 〕━━━┈⊷
┃ No non-admin members to promote.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 PROMOTING MEMBERS 〕━━━┈⊷
┃ Promoting ${members.length} members...
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });

      let promoted = 0;
      for (const member of members) {
        try {
          await sock.groupParticipantsUpdate(chatId, [member], 'promote');
          promoted++;
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ PROMOTION COMPLETE 〕━━━┈⊷
┃ ${promoted} members promoted to admin.
┃ 
┃ 🧛 "Power shared."
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
