export default {
  name: 'gitclone',
  description: 'Download a GitHub repository as a ZIP file',
  category: 'download',
  aliases: ['github', 'clone'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const url = args[0];

    if (!url) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📦 GIT CLONE 〕━━━┈⊷
┃ Download a GitHub repository
┃ 
┃ Usage: ${prefix}gitclone <github_url>
┃ 
┃ Example: ${prefix}gitclone https://github.com/user/repo
┃ 
┃ 🧛 "Clone from the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const GH_REGEX = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
    if (!GH_REGEX.test(url)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Invalid GitHub link.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const [, user, repo] = url.match(GH_REGEX);
    const cleanRepo = repo.replace(/\.git$/, '');
    const downloadUrl = `https://api.github.com/repos/${user}/${cleanRepo}/zipball`;

    await sock.sendMessage(chatId, { text: '📥 Fetching repository, please wait...' }, { quoted: msg });

    try {
      const response = await fetch(downloadUrl, { method: 'HEAD' });
      const cd = response.headers.get('content-disposition') || '';
      const filename = cd.match(/attachment; filename=(.*)/)?.[1] || `${cleanRepo}.zip`;

      await sock.sendMessage(chatId, {
        document: { url: downloadUrl },
        fileName: filename,
        mimetype: 'application/zip',
        caption: `╭━━━〔 📦 GIT CLONE 〕━━━┈⊷
┃ 📌 ${user}/${cleanRepo}
┃ ✅ Repository downloaded!
┃ 
┃ 🧛 "The code is yours."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
