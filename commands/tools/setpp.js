export default {
  name: 'setpp',
  description: 'Set profile picture',
  category: 'tools',
  aliases: ['spp', 'updatepp'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted || !quoted.imageMessage) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Please reply to an image!
┃ 
┃ Usage: Reply to an image with ${prefix}setpp
┃ 
┃ 🧛 "A new face for the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      const media = await sock.downloadMediaMessage(quoted);
      
      await sock.updateProfilePicture(chatId, media);
      
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ PP UPDATED 〕━━━┈⊷
┃ Profile picture updated successfully!
┃ 
┃ 🧛 "A new look for the vampire."
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
