export default {
  name: 'getgpp',
  description: 'Get group profile picture',
  category: 'tools',
  aliases: ['gdpp', 'grouppp'],
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

    try {
      const pp = await sock.profilePictureUrl(chatId, 'image');
      
      await sock.sendMessage(chatId, {
        image: { url: pp },
        caption: `╭━━━〔 🖼️ GROUP DP 〕━━━┈⊷
┃ 📌 Group profile picture
┃ 
┃ 🧛 "The coven's banner."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ No group profile picture found.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
