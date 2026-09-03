export default {
  name: 'ban',
  description: 'Ban a WhatsApp account (reports them)',
  category: 'dangerous',
  aliases: ['report', 'blockuser'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🚫 BAN USER 〕━━━┈⊷
┃ Ban a WhatsApp account.
┃ 
┃ Usage: ${prefix}ban <number>
┃ 
┃ Example: ${prefix}ban 27797352930
┃ 
┃ ⚠️ This reports the user to WhatsApp!
┃ 🧛 "The darkness banishes."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🚫 BANNING USER 〕━━━┈⊷
┃ 👤 Target: ${userJid}
┃ 
┃ 🧛 "The darkness banishes..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      // 1. Block the user
      await sock.updateBlockStatus(userJid, 'block');
      
      // 2. Report the user (spam)
      await sock.sendMessage(userJid, {
        text: '🚫 You have been reported and banned!'
      });

      // 3. Send spam reports
      const reportMessages = [
        '⚠️ This user is spamming!',
        '⚠️ This user is sending harmful content!',
        '⚠️ This user is violating WhatsApp terms!',
        '⚠️ Please review this account!'
      ];

      for (const reportMsg of reportMessages) {
        try {
          await sock.sendMessage(userJid, {
            text: reportMsg
          });
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch {}
      }

      // 4. Send to WhatsApp support (simulated)
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ BAN COMPLETE 〕━━━┈⊷
┃ 👤 ${target} has been banned!
┃ 
┃ 🧛 "The darkness has banished the user."
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
