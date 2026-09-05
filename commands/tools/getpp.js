export default {
  name: 'getpp',
  description: "Get user's profile picture",
  category: 'tools',
  aliases: ['spp', 'profile'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    let user = msg.key.participant || chatId;
    try {
      const pp = await sock.profilePictureUrl(user, 'image');
      await sock.sendMessage(chatId, {
        image: { url: pp },
        caption: `╭━━━〔 🖼️ PROFILE PICTURE 〕━━━┈⊷
┃ 👤 ${user.split('@')[0]}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch {
      await sock.sendMessage(chatId, { text: '❌ No profile picture found.' }, { quoted: msg });
    }
  }
};
