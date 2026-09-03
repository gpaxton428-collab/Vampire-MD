export default {
  name: 'unban',
  description: 'Unban a WhatsApp account',
  category: 'dangerous',
  aliases: ['unblock', 'unreport'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ UNBAN USER 〕━━━┈⊷
┃ Unban a WhatsApp account.
┃ 
┃ Usage: ${prefix}unban <number>
┃ 
┃ Example: ${prefix}unban 27797352930
┃ 
┃ 🧛 "The darkness forgives."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ UNBANNING USER 〕━━━┈⊷
┃ 👤 Target: ${userJid}
┃ 
┃ 🧛 "The darkness forgives..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      // 1. Unblock the user
      await sock.updateBlockStatus(userJid, 'unblock');

      // 2. Send unban message
      await sock.sendMessage(userJid, {
        text: '✅ You have been unbanned!'
      });

      // 3. Send multiple unban messages
      const unbanMessages = [
        '🩸 The darkness has forgiven you.',
        '🧛 Welcome back to the coven.',
        '🌑 You have been granted a second chance.',
        '💀 The ban has been lifted.'
      ];

      for (const unbanMsg of unbanMessages) {
        try {
          await sock.sendMessage(userJid, {
            text: unbanMsg
          });
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ UNBAN COMPLETE 〕━━━┈⊷
┃ 👤 ${target} has been unbanned!
┃ 
┃ 🧛 "The darkness has forgiven the user."
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
