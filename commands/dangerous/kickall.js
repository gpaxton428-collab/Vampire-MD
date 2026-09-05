export default {
  name: 'kickall',
  description: 'Kick all members from group',
  category: 'dangerous',
  aliases: ['removeall', 'purge'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const confirm = args[0]?.toLowerCase();
    if (confirm !== 'confirm') {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ⚠️ KICK ALL 〕━━━┈⊷
┃ This will remove ALL members!
┃ Type: ${prefix}kickall confirm
┃ 🧛 "The coven will be purified."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const metadata = await sock.groupMetadata(chatId);
      const members = metadata.participants.filter(p => !p.admin).map(p => p.id);

      if (members.length === 0) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 NO MEMBERS 〕━━━┈⊷
┃ No non-admin members to kick.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ KICKING MEMBERS 〕━━━┈⊷
┃ Removing ${members.length} members...
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
