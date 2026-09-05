import { exec } from 'child_process';
import fs from 'fs';

export default {
  name: 'gitclone',
  description: 'Clone a GitHub repository',
  category: 'tools',
  aliases: ['clone', 'git'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const repoUrl = args[0];

    if (!repoUrl) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📦 GIT CLONE 〕━━━┈⊷
┃ Usage: ${prefix}gitclone <repo_url>
┃ 
┃ Example: ${prefix}gitclone https://github.com/user/repo.git
┃ 🧛 "Clone the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    await sock.sendMessage(chatId, { text: '⏳ Cloning repository...' }, { quoted: msg });

    try {
      const repoName = repoUrl.split('/').pop().replace('.git', '');
      exec(`git clone ${repoUrl}`, async (error, stdout, stderr) => {
        if (error) {
          return sock.sendMessage(chatId, {
            text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
          }, { quoted: msg });
        }

        const files = fs.readdirSync(`./${repoName}`);
        let fileList = files.slice(0, 10).join('\n┃    ├─ ');

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ CLONED 〕━━━┈⊷
┃ 📦 ${repoName}
┃ 📊 ${files.length} files
┃ 
┃ Files:
┃    ├─ ${fileList}
┃ ${files.length > 10 ? `┃    └─ ... and ${files.length - 10} more` : ''}
┃ 
┃ 🧛 "The darkness clones."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
