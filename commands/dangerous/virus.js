export default {
  name: 'virus',
  description: 'Fake virus attack',
  category: 'dangerous',
  aliases: ['malware', 'infect'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'the system';

    const messages = [
      '🦠 Virus detected!',
      '📊 Spreading malware...',
      '🔓 Infecting files...',
      '💀 System compromised!',
      `🎯 ${target} infected!`,
      '🩸 The darkness spreads!'
    ];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ VIRUS ATTACK 〕━━━┈⊷
┃ 🎯 Target: ${target}
┃ 
┃ 🧛 "The darkness infects..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    for (const msg of messages) {
      await sock.sendMessage(chatId, { text: msg });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ VIRUS SPREAD 〕━━━┈⊷
┃ 🎯 ${target} has been infected!
┃ 
┃ 🧛 "The darkness spreads."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
