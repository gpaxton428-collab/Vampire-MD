export default {
  name: 'kickall',
  description: 'Kick all members from a group',
  category: 'dangerous',
  aliases: ['removeall', 'purge'],
  ownerOnly: true,
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
        text: `╭━━━〔 ⚠️ KICK ALL 〕━━━┈⊷
┃ This will remove ALL members except admins!
┃ 
┃ Type: ${prefix}kickall confirm
┃ 
┃ 🧛 "The coven will be purified."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      const groupMetadata = await sock.groupMetadata(chatId);
      const participants = groupMetadata.participants;
      
      const admins = participants.filter(p => p.admin).map(p => p.id);
      const members = participants.filter(p => !p.admin).map(p => p.id);

      if (members.length === 0) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 NO MEMBERS 〕━━━┈⊷
┃ No non-admin members to kick.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ KICKING MEMBERS 〕━━━┈⊷
┃ Removing ${members.length} members...
┃ 
┃ 🧛 "The purification begins."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });

      let kicked = 0;
      for (const member of members) {
        try {
          await sock.groupParticipantsUpdate(chatId, [member], 'remove');
          kicked++;
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ PURIFICATION COMPLETE 〕━━━┈⊷
┃ ${kicked} members removed.
┃ 
┃ 🧛 "The coven is purified."
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
