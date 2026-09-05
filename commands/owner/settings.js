export default {
  name: 'settings',
  description: 'View bot settings',
  category: 'owner',
  aliases: ['set', 'config'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ⚙️ BOT SETTINGS 〕━━━┈⊷
┃ 
┃ 🤖 Bot: ${process.env.BOT_NAME || 'Vampire MD'}
┃ 🔤 Prefix: ${process.env.PREFIX || '.'}
┃ 👑 Owner: ${process.env.OWNER_NUMBER || 'Not set'}
┃ 
┃ 🧛 "The darkness controls."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
