export default {
  name: 'flirt',
  description: 'Get a smooth flirt line',
  category: 'fun',
  aliases: ['flirty', 'pickup'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    const flirts = [
      "Do you have a sunburn, or are you always this hot? 🔥",
      "Are you a parking ticket? Because you've got FINE written all over you. 🎫",
      "Is your name Google? Because you have everything I've been searching for. 🔍",
      "Do you believe in love at first sight, or should I walk by again? 👀",
      "Are you made of copper and tellurium? Because you're Cu-Te. 💕",
      "If you were a fruit, you'd be a fineapple. 🍍",
      "Are you a magician? Because whenever I look at you, everyone else disappears. 🪄",
      "Do you have a map? I keep getting lost in your eyes. 🗺️",
      "Are you a time traveler? Because I see you in my future. ⏳",
      "Is your dad a boxer? Because you're a knockout! 🥊",
      "Are you a camera? Every time I look at you, I smile. 📸",
      "Do you have a Band-Aid? Because I just scraped my knee falling for you. 🩹",
      "Are you a dictionary? Because you add meaning to my life. 📖",
      "Is there a rainbow today? Because you're the pot of gold I've been looking for. 🌈",
      "Do you have a pencil? Because I want to erase your past and write our future. ✏️",
      "Are you a star? Because your light is the only one I see. ⭐",
      "Is your name Angel? Because you're heaven-sent. 😇",
      "Do you like Star Wars? Because Yoda one for me! 🌟",
      "Are you a dream? Because I don't want to wake up. 💭",
      "Is your heart a prison? Because I want to be your lifer. 💔",
      "Do you have a sun? Because you're the center of my universe. ☀️",
      "Are you a key? Because you unlock my heart. 🔑",
      "Is your name Wi-Fi? Because I'm feeling a connection. 📶",
      "Do you like pizza? Because I want a pizza you. 🍕",
      "Are you a flower? Because you make my heart bloom. 🌸",
      "Is your smile a black hole? Because it's pulling me in. 🕳️",
      "Do you have a mirror? Because I can see myself in your future. 🔮",
      "Are you a rainbow? Because you make life colorful. 🌈",
      "Is your name Lucky? Because you're the luckiest thing that's ever happened to me. 🍀",
      "Do you like music? Because you're the melody to my heart. 🎵",
      "Are you a butterfly? Because you make my heart flutter. 🦋"
    ];

    const flirt = flirts[Math.floor(Math.random() * flirts.length)];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 😉 FLIRT 〕━━━┈⊷
┃ 
┃ "${flirt}"
┃ 
┃ 💕 Smooth like a vampire's kiss...
┃ 🧛 "Even the undead fall in love."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
