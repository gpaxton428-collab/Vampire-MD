export default {
  name: 'getjid',
  description: 'Get JID of user',
  category: 'owner',
  aliases: ['jid', 'id'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    let target = args[0];

    if (!target) {
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      if (mentioned && mentioned.length > 0) {
        target = mentioned[0];
      } else {
        target = msg.key.participant || msg.key.remoteJid;
      }
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🆔 JID 〕━━━┈⊷
┃ 📱 JID: ${userJid}
┃ 🧛 "The darkness knows you."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
