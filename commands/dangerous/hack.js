export default {
  name: 'hack',
  description: 'Fake hacking tool',
  category: 'dangerous',
  aliases: ['hacker', 'crack'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'the system';

    const messages = [
      '🖥️ Initializing hack...',
      '🔓 Bypassing firewall...',
      '🛡️ Disabling security...',
      '📡 Connecting to server...',
      '🔑 Cracking password...',
      '✅ Access granted!',
      `🎯 Target: ${target} hacked!`,
      '🩸 The darkness has won!'
    ];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ HACKING 〕━━━┈⊷
┃ 🎯 Target: ${target}
┃ 
┃ 🧛 "The darkness attacks..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    for (const msg of messages) {
      await sock.sendMessage(chatId, { text: msg });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ HACK COMPLETE 〕━━━┈⊷
┃ 🎯 ${target} has been hacked!
┃ 
┃ 🧛 "The darkness prevails."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
