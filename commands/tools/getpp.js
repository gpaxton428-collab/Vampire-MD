export default {
  name: 'getpp',
  description: 'Get profile picture of a user',
  category: 'tools',
  aliases: ['pp', 'avatar'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    let target = args[0];
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    // Get target from mention, reply, or argument
    if (mentioned && mentioned.length > 0) {
      target = mentioned[0];
    } else if (quoted && (quoted.participant || quoted.remoteJid)) {
      target = quoted.participant || quoted.remoteJid;
    }

    // If no target, use sender
    if (!target) {
      target = msg.key.participant || msg.key.remoteJid;
    }

    // Clean the jid
    if (!target.includes('@')) {
      target = target + '@s.whatsapp.net';
    }

    try {
      const pp = await sock.profilePictureUrl(target, 'image');
      
      await sock.sendMessage(chatId, {
        image: { url: pp },
        caption: `╭━━━〔 🖼️ PROFILE PICTURE 〕━━━┈⊷
┃ 👤 User: ${target}
┃ 
┃ 🧛 "Even vampires have faces."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      if (error.message.includes('404')) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ No profile picture found for this user.
┃ 
┃ 🧛 "Some vampires prefer to remain faceless."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
    }
  }
};
