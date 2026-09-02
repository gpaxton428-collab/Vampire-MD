export default {
  name: 'repo',
  description: 'Get the bot repository link',
  category: 'owner',
  aliases: ['github', 'source'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    await sock.sendMessage(chatId, { 
      text: `╭━━━〔 🧛 VAMPIRE MD 〕━━━┈⊷
┃ 📦 Repository
┃ 
┃ 🔗 https://github.com/gpaxton428-collab/Vampire-MD
┃ 
┃ ⭐ Star this repo if you like it!
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷` 
    }, { quoted: msg });
  }
};
