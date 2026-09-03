export default {
  name: 'prefix',
  description: 'Check the current bot prefix',
  category: 'owner',
  aliases: ['getprefix', 'currentprefix'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const currentPrefix = process.env.PREFIX || '.';

    await sock.sendMessage(chatId, {
      text: currentPrefix
    }, { quoted: msg });
  }
};
