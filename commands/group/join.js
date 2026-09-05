export default {
  name: 'join',
  description: 'Join a group via invite link',
  category: 'group',
  aliases: ['joingroup'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const link = args[0];

    if (!link) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 JOIN GROUP 〕━━━┈⊷
┃ Usage: ${prefix}join <invite_link>
┃ 
┃ Example: ${prefix}join https://chat.whatsapp.com/xxx
┃ 🧛 "Join the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const code = link.split('/').pop();
      await sock.groupAcceptInvite(code);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ JOINED 〕━━━┈⊷
┃ 🧛 "The darkness joins."
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
