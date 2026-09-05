export default {
  name: 'add',
  description: 'Add member to group',
  category: 'group',
  aliases: ['invite'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const number = args[0];

    if (!number) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👥 ADD 〕━━━┈⊷
┃ Usage: ${prefix}add <number>
┃ 
┃ Example: ${prefix}add 27797352930
┃ 🧛 "Welcome to the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const jid = number.includes('@') ? number : `${number}@s.whatsapp.net`;
      await sock.groupParticipantsUpdate(chatId, [jid], 'add');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ADDED 〕━━━┈⊷
┃ 👤 ${number} has been added!
┃ 🧛 "A new vampire joins."
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
