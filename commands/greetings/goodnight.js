export default {
  name: 'goodnight',
  description: 'Send a goodnight message',
  category: 'greetings',
  aliases: ['gn', 'night'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'everyone';

    const messages = [
      `🌙 Goodnight ${target}! 🌕\n\nThe night is ours. Sleep well, dream of darkness, and wake up stronger. The stars are watching over you!\n\n🧛 "The night is our time."`,
      `🌚 Night ${target}! 🌌\n\nThe sun has set, and we rise. Rest now, for tomorrow the darkness will call again!\n\n🦇 "We are creatures of the night."`,
      `🌙 Goodnight ${target}! ✨\n\nThe night is calm, the moon is bright. Let the darkness embrace you as you sleep!\n\n⚡ "Sleep tight, vampire."`,
      `🌚 Night ${target}! 🌙\n\nThe darkness welcomes you home. Sleep under the stars and wake up ready to conquer!\n\n🧛 "We rule the night."`,
      `🌙 Goodnight ${target}! 💫\n\nAs the moon rises, so does our power. Rest well and let the darkness renew you!\n\n🔥 "The night is our sanctuary."`,
      `🌚 Goodnight ${target}! 🖤\n\nThe shadows embrace you. Close your eyes and let the darkness take over. See you in the night!\n\n🌑 "We rise with the moon."`,
      `🌙 Night ${target}! 🌟\n\nThe stars are out, and the vampire in you is at peace. Sleep well, and may the darkness protect you!\n\n🧛 "In the night, we find our power."`
    ];

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🌙 GOODNIGHT 〕━━━┈⊷
┃ 
┃ ${randomMsg}
┃ 
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
