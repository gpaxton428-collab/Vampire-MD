export default {
  name: 'setgpp',
  description: 'Set group profile picture',
  category: 'tools',
  aliases: ['sgpp'],
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

    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted || !quoted.imageMessage) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Please reply to an image!
┃ 
┃ Usage: Reply to an image with ${prefix}setgpp
┃ 
┃ 🧛 "A new banner for the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      // Download using Baileys method
      const stream = await sock.downloadMediaMessage(quoted);
      
      // Update group profile picture
      await sock.updateProfilePicture(chatId, stream);
      
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ GROUP PP UPDATED 〕━━━┈⊷
┃ Group profile picture updated successfully!
┃ 
┃ 🧛 "The coven rises with a new banner."
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
