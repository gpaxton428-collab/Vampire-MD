export default {
  name: 'setbio',
  description: 'Set bot WhatsApp bio (status)',
  category: 'owner',
  aliases: ['bio', 'setstatus'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const bio = args.join(' ');

    if (!bio) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📝 SET BIO 〕━━━┈⊷
┃ Usage: ${prefix}setbio <text>
┃ 
┃ Example: ${prefix}setbio 🧛 Vampire MD
┃ 🧛 "Write the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      await sock.updateProfileStatus(bio);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ BIO UPDATED 〕━━━┈⊷
┃ 📝 ${bio}
┃ 🧛 "The darkness speaks."
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
