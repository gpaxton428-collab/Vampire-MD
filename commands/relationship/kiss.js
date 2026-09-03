export default {
  name: 'kiss',
  description: 'Kiss someone',
  category: 'relationship',
  aliases: ['kissme', 'smooch'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'you';

    const kisses = [
      `💋 ${target}!\n\n*Sends a kiss your way*\n\nA vampire's kiss is eternal. May it fill you with warmth in the darkness.\n\n🩸 "A kiss from the night."`,
      `😘 ${target}!\n\n*A gentle kiss on your cheek*\n\nThe darkness sends its love.\n\n❤️ "Love in the shadows."`,
      `💏 ${target}!\n\n*Passionate vampire kiss*\n\nEternal love, eternal darkness. Let this kiss bind us forever.\n\n🧛 "Forever yours."`
    ];

    const randomMsg = kisses[Math.floor(Math.random() * kisses.length)];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 💋 KISS 〕━━━┈⊷
┃ 
┃ ${randomMsg}
┃ 
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
