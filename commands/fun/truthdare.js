export default {
  name: 'truthdare',
  description: 'Play Truth or Dare',
  category: 'fun',
  aliases: ['td', 'truthordare'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const choice = args[0]?.toLowerCase();

    const truthQuestions = [
      "What's the most embarrassing thing you've done in public?",
      "Have you ever lied to your best friend?",
      "What's your biggest fear?",
      "Who is your secret crush?",
      "What's the worst date you've ever been on?",
      "Have you ever cheated on a test?",
      "What's the most money you've ever found?",
      "Have you ever been in love?",
      "What's your biggest regret?",
      "Have you ever broken someone's heart?",
      "What's the most illegal thing you've done?",
      "Have you ever stalked someone on social media?",
      "What's your biggest insecurity?",
      "Have you ever had a crush on a teacher?",
      "What's the worst thing you've ever said to someone?"
    ];

    const dareActions = [
      "Send a random emoji to someone in your contacts",
      "Post a random status update right now",
      "Call someone and tell them you love them",
      "Do your best impression of a famous person",
      "Send a voice note singing a song",
      "Change your profile picture for 10 minutes",
      "Send a message in all caps to someone",
      "Do 10 pushups right now",
      "Send a funny selfie",
      "Speak in an accent for the next 5 minutes",
      "Send a random GIF to a group chat",
      "Compliment the first person you see",
      "Send a message with only emojis",
      "Do a random dance and send a video",
      "Call a friend and say 'I miss you'"
    ];

    const randomTruth = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
    const randomDare = dareActions[Math.floor(Math.random() * dareActions.length)];

    if (choice === 'truth') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 💬 TRUTH 〕━━━┈⊷\n┃ ${randomTruth}\n╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } else if (choice === 'dare') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔥 DARE 〕━━━┈⊷\n┃ ${randomDare}\n╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } else {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🎲 TRUTH OR DARE 〕━━━┈⊷\n┃ Usage: ${prefix}truthdare [truth/dare]\n┃ \n┃ Examples:\n┃ ${prefix}truthdare truth\n┃ ${prefix}truthdare dare\n╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
