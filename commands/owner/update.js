import { exec } from 'child_process';
import fs from 'fs';

export default {
  name: 'update',
  description: 'Update the bot from GitHub',
  category: 'owner',
  aliases: ['pull', 'gitpull'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!fs.existsSync('.git')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Not a git repository.
┃ Please clone from GitHub first.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🔄 UPDATING 〕━━━┈⊷
┃ 📥 Checking for updates...
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      // Fetch latest changes
      exec('git fetch origin main', async (fetchError) => {
        if (fetchError) {
          await sock.sendMessage(chatId, {
            text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${fetchError.message}
╰━━━━━━━━━━━━━━━┈⊷`
          }, { quoted: msg });
          return;
        }

        // Pull latest changes
        exec('git pull origin main', async (pullError, pullStdout) => {
          if (pullError) {
            await sock.sendMessage(chatId, {
              text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${pullError.message}
╰━━━━━━━━━━━━━━━┈⊷`
            }, { quoted: msg });
            return;
          }

          // Check if package.json changed
          const packageChanged = pullStdout.includes('package.json') || pullStdout.includes('package-lock.json');

          let response = `╭━━━〔 ✅ UPDATE SUCCESSFUL 〕━━━┈⊷
┃ 📦 Changes:
┃ 
┃ ${pullStdout.split('\n').slice(0, 5).join('\n┃ ')}
╰━━━━━━━━━━━━━━━┈⊷`;

          if (packageChanged) {
            response += `\n\n╭━━━〔 📦 INSTALLING 〕━━━┈⊷
┃ Dependencies changed!
┃ Running npm install...
╰━━━━━━━━━━━━━━━┈⊷`;
            await sock.sendMessage(chatId, { text: response }, { quoted: msg });

            exec('npm install', async (installError) => {
              if (installError) {
                await sock.sendMessage(chatId, {
                  text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ npm install failed
┃ Run manually: npm install
╰━━━━━━━━━━━━━━━┈⊷`
                }, { quoted: msg });
              } else {
                await sock.sendMessage(chatId, {
                  text: `╭━━━〔 ✅ INSTALLED 〕━━━┈⊷
┃ npm install completed!
┃ 🔄 Restart with: ${prefix}restart
╰━━━━━━━━━━━━━━━┈⊷`
                }, { quoted: msg });
              }
            });
          } else {
            response += `\n\n╭━━━〔 🔄 RESTART NEEDED 〕━━━┈⊷
┃ Restart with: ${prefix}restart
╰━━━━━━━━━━━━━━━┈⊷`;
            await sock.sendMessage(chatId, { text: response }, { quoted: msg });
          }
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
