export default {
  name: 'repo',
  description: 'Get bot repository info',
  category: 'owner',
  aliases: ['repository', 'github'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    const repoInfo = {
      name: 'Vampire MD',
      version: '2.5.0',
      owner: 'Paxton',
      repo: 'https://github.com/gpaxton428-collab/Vampire-MD',
      commands: '90+',
      status: '🟢 ONLINE'
    };

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 📦 REPO INFO 〕━━━┈⊷
┃ 📌 Name: ${repoInfo.name}
┃ 📦 Version: ${repoInfo.version}
┃ 👑 Owner: ${repoInfo.owner}
┃ 📊 Commands: ${repoInfo.commands}
┃ 📡 Status: ${repoInfo.status}
┃ 
┃ 🔗 ${repoInfo.repo}
┃ 
┃ 📌 Commands:
┃ ${prefix}repo fork - Fork this repo
┃ 
┃ 🧛 "The darkness is open source."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
