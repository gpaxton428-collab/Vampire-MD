export default {
  name: 'leavegroup',
  description: 'Make bot leave a group',
  category: 'owner',
  aliases: ['leave', 'exit'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🚪 LEAVE GROUP 〕━━━┈⊷
┃ Usage: ${prefix}leavegroup <group_jid>
┃ 
┃ Example: ${prefix}leavegroup 1234567890@g.us
┃ 🧛 "The darkness leaves."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      await sock.groupLeave(target);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ LEFT GROUP 〕━━━┈⊷
┃ 📌 ${target}
┃ 🧛 "The darkness has left."
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
