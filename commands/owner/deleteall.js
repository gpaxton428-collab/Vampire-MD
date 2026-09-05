import fs from 'fs';
import path from 'path';

export default {
  name: 'deleteall',
  description: 'Delete ALL messages in a chat (DANGEROUS)',
  category: 'owner',
  aliases: ['purgeall', 'clearallmsg'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0] || chatId;
    const count = parseInt(args[1]) || 50;

    if (count > 200) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Max count is 200!
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🗑️ DELETING MESSAGES 〕━━━┈⊷
┃ 📊 Count: ${count}
┃ 🧛 "The darkness erases..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      const messages = await sock.loadMessages(target, count);
      let deleted = 0;

      for (const msg of messages) {
        try {
          await sock.sendMessage(target, { delete: msg.key });
          deleted++;
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ DELETE COMPLETE 〕━━━┈⊷
┃ 📊 ${deleted} messages deleted.
┃ 🧛 "The darkness erases."
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
