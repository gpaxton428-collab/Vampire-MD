export default {
  name: 'wipe',
  description: 'Fake system wipe',
  category: 'dangerous',
  aliases: ['erase', 'destroy'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args.join(' ') || 'the system';

    const messages = [
      '💀 Wiping system...',
      '🗑️ Deleting files...',
      '📊 20% complete...',
      '📊 40% complete...',
      '📊 60% complete...',
      '📊 80% complete...',
      '✅ 100% complete!',
      `🎯 ${target} has been wiped!`,
      '🩸 The darkness erases!'
    ];

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ SYSTEM WIPE 〕━━━┈⊷
┃ 🎯 Target: ${target}
┃ 
┃ 🧛 "The darkness erases..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    for (const msg of messages) {
      await sock.sendMessage(chatId, { text: msg });
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ WIPE COMPLETE 〕━━━┈⊷
┃ 🎯 ${target} has been wiped!
┃ 
┃ 🧛 "The darkness erases."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
