export default {
  name: 'restart',
  description: 'Restart the bot process',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { text: '♻️ Restarting...' }, { quoted: msg });
    setTimeout(() => process.exit(0), 1000);
  }
};
