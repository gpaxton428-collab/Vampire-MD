export default {
  name: 'shutdown',
  description: 'Shutdown the bot',
  category: 'owner',
  aliases: ['stop', 'kill'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🧛 SHUTTING DOWN 〕━━━┈⊷
┃ The darkness falls silent...
┃ 
┃ "Until we rise again."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    setTimeout(() => {
      process.exit(0);
    }, 2000);
  }
};
