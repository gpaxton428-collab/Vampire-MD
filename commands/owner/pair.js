import fs from 'fs';

export default {
  name: 'pair',
  description: 'Pair a new device with WhatsApp (Owner only)',
  category: 'owner',
  aliases: ['pairing', 'linkdevice'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const number = args[0];

    if (!number) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 PAIR DEVICE 〕━━━┈⊷
┃ Pair a new WhatsApp device
┃ 
┃ Usage: ${prefix}pair <phone_number>
┃ 
┃ Example: ${prefix}pair 27797352930
┃ 
┃ 📌 Enter your phone number with country code
┃ 📌 No spaces or special characters
┃ 
┃ 🧛 "Link a new device to the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const cleanNumber = number.replace(/[^0-9]/g, '');

    if (cleanNumber.length < 10) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Invalid phone number!
┃ Please enter a valid number with country code.
┃ 
┃ Example: 27797352930
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🔗 PAIRING INITIATED 〕━━━┈⊷
┃ 📱 Phone: +${cleanNumber}
┃ 
┃ ⏳ Generating pairing code...
┃ 
┃ 🧛 "The darkness connects."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      // Request pairing code
      const code = await sock.requestPairingCode(cleanNumber);
      const cleanCode = code.replace(/\s+/g, '');
      const formattedCode = cleanCode.length === 8 ? 
        `${cleanCode.substring(0, 4)}-${cleanCode.substring(4, 8)}` : 
        cleanCode;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔑 PAIRING CODE 〕━━━┈⊷
┃ 📱 Phone: +${cleanNumber}
┃ 🔑 Code: *${formattedCode}*
┃ ⏰ Expires: 10 minutes
┃ 
┃ 📌 INSTRUCTIONS:
┃ 1. Open WhatsApp on your phone
┃ 2. Go to Settings → Linked Devices
┃ 3. Tap "Link a Device"
┃ 4. Enter the code: *${formattedCode}*
┃ 
┃ 🧛 "Welcome to the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });

    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to generate pairing code.
┃ 
┃ ${error.message}
┃ 
┃ 💡 Make sure you're connected to WhatsApp.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
