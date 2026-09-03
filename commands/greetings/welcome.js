export default {
  name: 'welcome',
  description: 'Send a welcome message',
  category: 'greetings',
  aliases: ['wel', 'wlc'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'you';

    const messages = [
      `🎉 Welcome ${target}! 🧛\n\nThe darkness welcomes you to the coven. You are now part of something greater!\n\n🦇 "The coven grows."`,
      `🧛 Welcome ${target}! 🌙\n\nYou have entered the realm of darkness. May your stay be eternal!\n\n⚡ "We welcome you with open shadows."`,
      `🎊 Welcome ${target}! 🩸\n\nThe vampires of the night greet you. You are now one of us!\n\n🔥 "Blood binds us all."`
    ];

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🎉 WELCOME 〕━━━┈⊷
┃ 
┃ ${randomMsg}
┃ 
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
