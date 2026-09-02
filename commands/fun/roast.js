export default {
  name: 'roast',
  description: 'Get a savage roast',
  category: 'fun',
  aliases: ['burn', 'savage'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'you';

    const roasts = [
      "You're not stupid; you just have bad luck thinking.",
      "You're like a cloud. When you disappear, it's a beautiful day.",
      "If I wanted to hear from an idiot, I'd watch your Instagram stories.",
      "You're the reason the gene pool needs a lifeguard.",
      "I'd agree with you, but then we'd both be wrong.",
      "You bring everyone so much joy... when you leave.",
      "You're proof that evolution can go in reverse.",
      "If brains were dynamite, you couldn't blow your nose.",
      "You're not the dumbest person on earth, but you better hope they don't die.",
      "I've seen salads more intelligent than you.",
      "You're like a software update. I see you, but I ignore you.",
      "Your secrets are safe with me. I never listen anyway.",
      "You're like a broken pencil... pointless.",
      "I would tell you to go to hell, but I don't want to see you there.",
      "You're the human equivalent of a participation trophy.",
      "If I wanted to kill myself, I'd climb your ego and jump to your IQ.",
      "You're not pretty enough to be this dumb.",
      "I've met rocks with more personality.",
      "You're the reason they put instructions on shampoo bottles.",
      "Your birth certificate is an apology letter from the condom factory.",
      "You're like a candle in the wind... barely glowing.",
      "I'd call you a tool, but tools are useful.",
      "You're the MVP of mediocrity.",
      "Your face makes my phone charge slower.",
      "You're like a Wi-Fi signal... weak and barely there.",
      "I'd say you're funny, but I don't want to lie.",
      "You're the cheese on top of the world's worst pizza.",
      "Your opinion is like a screensaver, nobody cares.",
      "You're like a Monday morning... nobody likes you.",
      "If you were any more basic, you'd be a white girl at Starbucks."
    ];

    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🔥 ROAST 〕━━━┈⊷
┃ 
┃ "${roast}"
┃ 
┃ 💀 Target: ${target}
┃ 🧛 "Even the undead feel the burn."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
