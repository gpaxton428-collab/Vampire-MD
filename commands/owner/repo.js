export default {
  name: 'repo',
  description: 'Get the bot repository information',
  category: 'owner',
  aliases: ['github', 'source', 'repository'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const sub = (args[0] || '').toLowerCase();

    const repoInfo = {
      name: 'Vampire MD',
      version: 'V2.5.0',
      owner: 'Paxton Mathebula',
      repo: 'https://github.com/gpaxton428-collab/Vampire-MD',
      author: 'Paxton',
      license: 'MIT',
      commands: '50+',
      status: '🟢 ONLINE',
      quote: '"In the darkness, we rise..."'
    };

    if (sub === 'info' || sub === 'about') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📦 REPO INFO 〕━━━┈⊷
┃ 📌 Name: ${repoInfo.name}
┃ 📦 Version: ${repoInfo.version}
┃ 👑 Owner: ${repoInfo.owner}
┃ 📄 License: ${repoInfo.license}
┃ 📊 Commands: ${repoInfo.commands}
┃ 📡 Status: ${repoInfo.status}
┃ 
┃ 🧛 ${repoInfo.quote}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (sub === 'link' || sub === 'url') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 REPO LINK 〕━━━┈⊷
┃ ${repoInfo.repo}
┃ 
┃ 🧛 "The source is in the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (sub === 'stats') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📊 REPO STATS 〕━━━┈⊷
┃ 📌 Name: ${repoInfo.name}
┃ 📦 Version: ${repoInfo.version}
┃ 👑 Owner: ${repoInfo.owner}
┃ 📊 Commands: ${repoInfo.commands}
┃ 📡 Status: ${repoInfo.status}
┃ 📄 License: ${repoInfo.license}
┃ 
┃ 🧛 "Stats from the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    // Default: Show full repo info
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🧛 VAMPIRE MD 〕━━━┈⊷
┃ 📌 ${repoInfo.name} ${repoInfo.version}
┃ 👑 Owner: ${repoInfo.owner}
┃ 📊 Commands: ${repoInfo.commands}
┃ 📡 Status: ${repoInfo.status}
┃ 
┃ 🔗 ${repoInfo.repo}
┃ 
┃ 📋 Commands:
┃ ${prefix}repo info   - About the repo
┃ ${prefix}repo link   - Get repo link
┃ ${prefix}repo stats  - Repo statistics
┃ 
┃ 🧛 ${repoInfo.quote}
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
