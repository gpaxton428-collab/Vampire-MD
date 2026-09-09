export default {
  name: 'promoteall',
  description: 'Promote all members to admin',
  category: 'group',
  aliases: ['makealladmin', 'alladmin'],
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
        text: `╭━━━〔 ⚠️ PROMOTE ALL 〕━━━┈⊷
┃ This will promote ALL members to admin!
┃ 
┃ Type: ${prefix}promoteall confirm
┃ 
┃ 🧛 "Power to the people."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const metadata = await sock.groupMetadata(chatId);
      const members = metadata.participants.filter(p => !p.admin).map(p => p.id);

      if (members.length === 0) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 NO MEMBERS 〕━━━┈⊷
┃ No non-admin members to promote.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
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
┃ ${promoted} members promoted to admin!
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
