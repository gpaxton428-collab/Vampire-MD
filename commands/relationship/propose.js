export default {
  name: 'propose',
  description: 'Propose to someone',
  category: 'relationship',
  aliases: ['marry', 'love'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'the one you love';

    const proposals = [
      `💍 ${target}, will you marry me?\n\nYou are the light in my darkness, the blood in my veins. I want to spend eternity with you!\n\n🧛 "Forever is not long enough."`,
      `🌹 ${target}, will you be mine forever?\n\nIn this world of darkness, you are my only light. Let me love you for all eternity!\n\n🩸 "Love never dies."`,
      `💕 ${target}, I love you!\n\nYou are the reason I rise every night. You are my everything!\n\n🧛 "You are my eternal love."`,
      `🌙 ${target}, will you be my vampire queen/king?\n\nTogether we can rule the night forever. Say yes and never walk alone!\n\n👑 "Rule the darkness with me."`,
      `❤️ ${target}, I can't imagine eternity without you.\n\nYou are my soulmate, my other half, my eternal love!\n\n🦇 "Two souls, one darkness."`
    ];

    const randomMsg = proposals[Math.floor(Math.random() * proposals.length)];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 💍 PROPOSAL 〕━━━┈⊷
┃ 
┃ ${randomMsg}
┃ 
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
