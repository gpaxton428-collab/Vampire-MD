export default {
  name: 'bomb',
  description: 'Fake SMS bomb',
  category: 'dangerous',
  aliases: ['smsbomb', 'bombing'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'the number';

    const messages = [
      '💣 SMS Bomb initiated!',
      '📱 Sending 1000 messages...',
      '📨 250 messages sent...',
      '📨 500 messages sent...',
      '📨 750 messages sent...',
      '✅ 1000 messages sent!',
      `🎯 ${target} bombed!`,
      '🩸 The darkness explodes!'
    ];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 💣 SMS BOMB 〕━━━┈⊷
┃ 🎯 Target: ${target}
┃ 
┃ 🧛 "The darkness explodes..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    for (const msg of messages) {
      await sock.sendMessage(chatId, { text: msg });
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 💣 BOMB COMPLETE 〕━━━┈⊷
┃ 🎯 ${target} has been bombed!
┃ 
┃ 🧛 "The darkness explodes."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
