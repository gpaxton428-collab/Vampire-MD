export default {
  name: 'block',
  description: 'Block a user on WhatsApp',
  category: 'dangerous',
  aliases: ['blockwa'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🚫 BLOCK USER 〕━━━┈⊷
┃ Usage: ${prefix}block <number>
┃ 
┃ Example: ${prefix}block 27797352930
┃ 
┃ 🧛 "The darkness blocks."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
      await sock.updateBlockStatus(userJid, 'block');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ BLOCKED 〕━━━┈⊷
┃ 👤 ${target}
┃ 🚫 Status: BLOCKED
┃ 🧛 "Blocked from existence."
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
