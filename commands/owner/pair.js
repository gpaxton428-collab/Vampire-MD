export default {
  name: 'pair',
  description: 'Generate pairing code for WhatsApp',
  category: 'owner',
  aliases: ['paircode', 'linkdevice'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const number = args[0];

    if (!number) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 PAIR 〕━━━┈⊷
┃ Usage: ${prefix}pair <number>
┃ 
┃ Example: ${prefix}pair 27797352930
┃ 🧛 "Link the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const cleanNumber = number.replace(/[^0-9]/g, '');
    if (cleanNumber.length < 10) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Invalid number!
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const code = await sock.requestPairingCode(cleanNumber);
      const formatted = code.replace(/\s+/g, '');

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔑 PAIRING CODE 〕━━━┈⊷
┃ 📱 +${cleanNumber}
┃ 🔑 ${formatted}
┃ ⏰ Expires in 3 minutes
┃ 
┃ 📌 Enter on WhatsApp → Settings → Linked Devices
┃ 🧛 "The darkness connects."
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
