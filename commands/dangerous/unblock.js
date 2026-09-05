export default {
  name: 'unblock',
  description: 'Unblock a user on WhatsApp',
  category: 'dangerous',
  aliases: ['unblockwa'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ UNBLOCK USER 〕━━━┈⊷
┃ Usage: ${prefix}unblock <number>
┃ 
┃ Example: ${prefix}unblock 27797352930
┃ 
┃ 🧛 "The darkness unblocks."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      await sock.updateBlockStatus(userJid, 'unblock');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ UNBLOCKED 〕━━━┈⊷
┃ 👤 ${target}
┃ ✅ Status: UNBLOCKED
┃ 🧛 "Forgiven and free."
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
