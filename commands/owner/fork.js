export default {
  name: 'fork',
  description: 'Fork the repository with tag',
  category: 'owner',
  aliases: ['forkrepo'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    const repoLink = 'https://github.com/gpaxton428-collab/Vampire-MD';

    if (!target) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🔱 FORK 〕━━━┈⊷
┃ Usage: ${prefix}fork @user
┃ 
┃ Example: ${prefix}fork @username
┃ 
┃ This will tag the user to fork the repo!
┃ 🧛 "Fork the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const mentionJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🔱 FORK THIS REPO 〕━━━┈⊷
┃ 
┃ @${target.replace('@s.whatsapp.net', '')}
┃ 
┃ Please fork the repository:
┃ 🔗 ${repoLink}
┃ 
┃ ⭐ Star it if you like it!
┃ 
┃ 🧛 "Fork the darkness."
╰━━━━━━━━━━━━━━━┈⊷`,
      mentions: [mentionJid]
    }, { quoted: msg });
  }
};
