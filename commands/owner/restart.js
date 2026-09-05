export default {
  name: 'restart',
  description: 'Restart the bot',
  category: 'owner',
  aliases: ['reboot'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🔄 RESTARTING 〕━━━┈⊷
┃ 🧛 See you in a moment...
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
    setTimeout(() => process.exit(0), 2000);
  }
};
