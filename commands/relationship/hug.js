export default {
  name: 'hug',
  description: 'Hug someone',
  category: 'relationship',
  aliases: ['cuddle', 'hugme'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'you';

    const hugs = [
      `🤗 ${target}!\n\n*Wraps you in a warm hug*\n\nEven vampires need comfort sometimes. Stay warm in the darkness.\n\n🦇 "A hug from the shadows."`,
      `🤗 ${target}!\n\n*A tight vampire hug*\n\nYou are safe in my arms. The darkness cannot hurt you.\n\n❤️ "Comfort in the night."`,
      `🫂 ${target}!\n\n*Holds you close*\n\nYou are not alone in the darkness. I am always here for you.\n\n🧛 "Together in the dark."`
    ];

    const randomMsg = hugs[Math.floor(Math.random() * hugs.length)];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🤗 HUG 〕━━━┈⊷
┃ 
┃ ${randomMsg}
┃ 
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
