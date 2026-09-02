import { exec } from 'child_process';

export default {
  name: 'restart',
  description: 'Restart the bot',
  category: 'owner',
  aliases: ['reboot'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    await sock.sendMessage(chatId, { 
      text: `╭━━━〔 🔄 RESTARTING 〕━━━┈⊷\n┃ 🧛 See you in a moment...\n┃ \n┃ "In the darkness, we rise."\n╰━━━━━━━━━━━━━━━┈⊷` 
    }, { quoted: msg });

    setTimeout(() => {
      exec('pm2 restart VampireTech 2>/dev/null || npm start', (error) => {
        if (error) console.error('Restart failed:', error);
        process.exit(0);
      });
    }, 2000);
  }
};
