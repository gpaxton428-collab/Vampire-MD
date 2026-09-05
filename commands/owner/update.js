import { exec } from 'child_process';
import fs from 'fs';

export default {
  name: 'update',
  description: 'Update bot from GitHub',
  category: 'owner',
  aliases: ['pull', 'gitpull'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!fs.existsSync('.git')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Not a git repository.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    await sock.sendMessage(chatId, { text: '⏳ Pulling updates...' }, { quoted: msg });

    try {
      exec('git pull origin main', async (error, stdout) => {
        if (error) {
          return sock.sendMessage(chatId, {
            text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
          }, { quoted: msg });
        }

        const changes = stdout.split('\n').slice(0, 5).join('\n┃    ');
        const hasChanges = !stdout.includes('Already up to date');

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ UPDATE COMPLETE 〕━━━┈⊷
┃ ${hasChanges ? '📦 Changes:\n┃    ' + changes : '🔄 Already up to date!'}
┃ 
┃ 🧛 "The darkness updates."
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
