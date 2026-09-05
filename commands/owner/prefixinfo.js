export default {
  name: 'prefixinfo',
  description: 'Show current prefix',
  category: 'owner',
  aliases: ['getprefix', 'currentprefix'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const currentPrefix = process.env.PREFIX || '.';

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🔤 PREFIX INFO 〕━━━┈⊷
┃ Prefix: ${currentPrefix}
┃ 🧛 "The summoning word."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
