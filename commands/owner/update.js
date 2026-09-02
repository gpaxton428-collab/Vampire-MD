import { exec } from 'child_process';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export default {
  name: 'update',
  description: 'Update the bot from GitHub',
  category: 'owner',
  aliases: ['pull', 'gitpull'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷\n┃ GITHUB_TOKEN not found in .env\n┃ Please add your token\n╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🔄 UPDATING 〕━━━┈⊷\n┃ 📥 Checking for updates...\n╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    if (!fs.existsSync('.git')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷\n┃ Not a git repository.\n┃ Please clone from GitHub first.\n╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      // Set the remote URL with token for authentication
      const repoUrl = `https://gpaxton428-collab:${token}@github.com/gpaxton428-collab/Vampire-MD.git`;
      
      exec(`git remote set-url origin ${repoUrl}`, async (setUrlError) => {
        if (setUrlError) {
          await sock.sendMessage(chatId, {
            text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷\n┃ Failed to set auth: ${setUrlError.message}\n╰━━━━━━━━━━━━━━━┈⊷`
          }, { quoted: msg });
          return;
        }

        exec('git fetch origin main', async (fetchError) => {
          if (fetchError) {
            await sock.sendMessage(chatId, {
              text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷\n┃ Fetch failed: ${fetchError.message}\n╰━━━━━━━━━━━━━━━┈⊷`
            }, { quoted: msg });
            return;
          }

          exec('git rev-parse HEAD', (headError, headStdout) => {
            if (headError) {
              sock.sendMessage(chatId, { text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷\n┃ Could not check current version.\n╰━━━━━━━━━━━━━━━┈⊷` }, { quoted: msg });
              return;
            }

            const currentCommit = headStdout.trim();

            exec('git rev-parse origin/main', (originError, originStdout) => {
              if (originError) {
                sock.sendMessage(chatId, { text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷\n┃ Could not check remote version.\n╰━━━━━━━━━━━━━━━┈⊷` }, { quoted: msg });
                return;
              }

              const remoteCommit = originStdout.trim();

              if (currentCommit === remoteCommit) {
                sock.sendMessage(chatId, {
                  text: `╭━━━〔 ✅ UP TO DATE 〕━━━┈⊷\n┃ 📌 Commit: ${currentCommit.substring(0, 7)}\n┃ 🧛 Bot is already updated!\n╰━━━━━━━━━━━━━━━┈⊷`
                }, { quoted: msg });
                return;
              }

              sock.sendMessage(chatId, { text: `╭━━━〔 📥 DOWNLOADING 〕━━━┈⊷\n┃ 📦 Pulling latest changes...\n╰━━━━━━━━━━━━━━━┈⊷` }, { quoted: msg });

              exec('git pull origin main', async (pullError, pullStdout) => {
                if (pullError) {
                  await sock.sendMessage(chatId, {
                    text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷\n┃ Update failed: ${pullError.message}\n╰━━━━━━━━━━━━━━━┈⊷`
                  }, { quoted: msg });
                  return;
                }

                const packageChanged = pullStdout.includes('package.json') || pullStdout.includes('package-lock.json');

                let response = `╭━━━〔 ✅ UPDATE SUCCESSFUL 〕━━━┈⊷\n┃ 📦 Changes:\n┃ \n`;
                const lines = pullStdout.split('\n').slice(0, 5);
                lines.forEach(line => {
                  if (line.trim()) response += `┃ ${line.trim()}\n`;
                });
                response += `╰━━━━━━━━━━━━━━━┈⊷`;

                if (packageChanged) {
                  response += `\n\n╭━━━〔 📦 INSTALLING 〕━━━┈⊷\n┃ Dependencies changed!\n┃ Running npm install...\n╰━━━━━━━━━━━━━━━┈⊷`;
                  await sock.sendMessage(chatId, { text: response }, { quoted: msg });

                  exec('npm install', async (installError) => {
                    if (installError) {
                      await sock.sendMessage(chatId, {
                        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷\n┃ npm install failed\n┃ Run manually: npm install\n╰━━━━━━━━━━━━━━━┈⊷`
                      }, { quoted: msg });
                    } else {
                      await sock.sendMessage(chatId, {
                        text: `╭━━━〔 ✅ INSTALLED 〕━━━┈⊷\n┃ npm install completed!\n┃ 🔄 Restart with: ${prefix}restart\n╰━━━━━━━━━━━━━━━┈⊷`
                      }, { quoted: msg });
                    }
                  });
                } else {
                  response += `\n\n╭━━━〔 🔄 RESTART NEEDED 〕━━━┈⊷\n┃ Restart with: ${prefix}restart\n╰━━━━━━━━━━━━━━━┈⊷`;
                  await sock.sendMessage(chatId, { text: response }, { quoted: msg });
                }
              });
            });
          });
        });
      });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷\n┃ ${error.message}\n╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
