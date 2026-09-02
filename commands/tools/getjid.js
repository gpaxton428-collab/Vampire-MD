export default {
  name: 'getjid',
  description: 'Get JID of a user or group',
  category: 'tools',
  aliases: ['jid', 'id'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    let target = msg.key.participant || chatId;
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (mentioned && mentioned.length > 0) {
      target = mentioned[0];
    } else if (quoted && quoted.participant) {
      target = quoted.participant;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🆔 JID INFO 〕━━━┈⊷
┃ 📱 JID: ${target}
┃ 📌 Type: ${target.includes('@g.us') ? 'Group' : target.includes('@lid') ? 'Linked Device' : 'User'}
┃ 
┃ 🧛 "Every soul has an identity."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
