import { exec } from 'child_process';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export default {
  name: 'push',
  description: 'Push updates to GitHub',
  category: 'owner',
  aliases: ['deploy', 'gitpush'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const commitMsg = args.join(' ') || '🔄 Bot update';

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ GITHUB_TOKEN not found in .env
┃ Please add your token
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (!fs.existsSync('.git')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Not a git repository.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🚀 PUSHING 〕━━━┈⊷
┃ 📦 Commit: ${commitMsg}
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      // Set remote with token
      const repoUrl = `https://gpaxton428-collab:${token}@github.com/gpaxton428-collab/Vampire-MD.git`;
      exec(`git remote set-url origin ${repoUrl}`);

      // Add all changes
      exec('git add .', (addError) => {
        if (addError) {
          sock.sendMessage(chatId, { text: `❌ Add failed: ${addError.message}` }, { quoted: msg });
          return;
        }

        // Commit
        exec(`git commit -m "${commitMsg}"`, (commitError, commitStdout) => {
          if (commitError && !commitStdout.includes('nothing to commit')) {
            sock.sendMessage(chatId, { text: `❌ Commit failed: ${commitError.message}` }, { quoted: msg });
            return;
          }

          // Push
          exec('git push origin main', async (pushError, pushStdout) => {
            if (pushError) {
              await sock.sendMessage(chatId, {
                text: `╭━━━〔 ❌ PUSH FAILED 〕━━━┈⊷
┃ ${pushError.message}
╰━━━━━━━━━━━━━━━┈⊷`
              }, { quoted: msg });
              return;
            }

            await sock.sendMessage(chatId, {
              text: `╭━━━〔 ✅ PUSH SUCCESSFUL 〕━━━┈⊷
┃ 📦 Changes pushed to GitHub!
┃ 
┃ 📌 Commit: ${commitMsg}
╰━━━━━━━━━━━━━━━┈⊷`
            }, { quoted: msg });
          });
        });
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
