export default {
  name: 'getpp',
  description: "Get a user's profile picture",
  category: 'tools',
  aliases: ['spp', 'profile'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const isGroup = chatId.endsWith('@g.us');
    
    let user = msg.key.participant || chatId;
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    // Get target from mention or reply
    if (isGroup) {
      if (mentioned && mentioned.length > 0) {
        user = mentioned[0];
      } else if (quoted && quoted.participant) {
        user = quoted.participant;
      }
    } else {
      // In private chat, if there's a mentioned user, use that
      if (mentioned && mentioned.length > 0) {
        user = mentioned[0];
      }
    }

    try {
      const pp = await sock.profilePictureUrl(user, 'image');
      const name = user.split('@')[0];
      const isOwner = user === (msg.key.participant || chatId);

      await sock.sendMessage(chatId, {
        image: { url: pp },
        caption: `╭━━━〔 🖼️ PROFILE PICTURE 〕━━━┈⊷
┃ 👤 User: ${name}
┃ ${isOwner ? '👑 You' : ''}
┃ 
┃ 🧛 "Even vampires have faces."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ No profile picture found for this user.
┃ 
┃ 🧛 "Some vampires prefer to remain faceless."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
