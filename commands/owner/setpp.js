export default {
  name: 'setpp',
  description: 'Set bot profile picture',
  category: 'owner',
  aliases: ['profilepic', 'ppic'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted || !quoted.imageMessage) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🖼️ SET PP 〕━━━┈⊷
┃ Reply to an image!
┃ 
┃ Usage: Reply with ${prefix}setpp
┃ 🧛 "Change the darkness's face."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const buffer = await sock.downloadMediaMessage(quoted);

      if (!buffer) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to download image.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      await sock.updateProfilePicture(chatId, buffer);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ PP UPDATED 〕━━━┈⊷
┃ 🧛 "The darkness has a new face."
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
