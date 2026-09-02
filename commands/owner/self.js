import fs from 'fs';

export default {
  name: 'self',
  description: 'Toggle bot between public and private mode',
  category: 'owner',
  aliases: ['mode', 'privacy'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    const modeFile = './bot_mode.json';
    let currentMode = 'public';

    if (fs.existsSync(modeFile)) {
      const data = JSON.parse(fs.readFileSync(modeFile, 'utf8'));
      currentMode = data.mode || 'public';
    }

    if (!mode || !['public', 'private'].includes(mode)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔒 BOT MODE 〕━━━┈⊷
┃ Current Mode: ${currentMode.toUpperCase()}
┃ 
┃ Usage: ${prefix}self [public/private]
┃ 
┃ 📌 Public - Anyone can use commands
┃ 📌 Private - Only owner can use commands
┃ 
┃ 🧛 "Choose your darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    fs.writeFileSync(modeFile, JSON.stringify({ 
      mode: mode, 
      updatedAt: new Date().toISOString(),
      updatedBy: msg.key.participant || msg.key.remoteJid
    }, null, 2));

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ MODE UPDATED 〕━━━┈⊷
┃ Mode: ${mode.toUpperCase()}
┃ 
┃ ${mode === 'private' ? '🔒 Only the owner can use commands.' : '🌐 Anyone can use commands.'}
┃ 
┃ 🧛 "The darkness adapts to your will."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
