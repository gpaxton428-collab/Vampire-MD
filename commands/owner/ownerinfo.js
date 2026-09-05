import fs from 'fs';

export default {
  name: 'ownerinfo',
  description: 'Show owner information',
  category: 'owner',
  aliases: ['owner', 'creator'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    const ownerName = process.env.OWNER_NAME || 'Paxton';
    const ownerNumber = process.env.OWNER_NUMBER || '27797352930';

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 👑 OWNER INFO 〕━━━┈⊷
┃ 👤 Name: ${ownerName}
┃ 📱 Number: +${ownerNumber}
┃ 👑 Title: Vampire King
┃ 🧛 "The master of darkness."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
