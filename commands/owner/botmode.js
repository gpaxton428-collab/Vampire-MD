import fs from 'fs';

export default {
  name: 'botmode',
  description: 'Change bot mode',
  category: 'owner',
  aliases: ['mode', 'setmode'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    const modeFile = './bot_mode.json';
    let currentMode = 'public';

    if (fs.existsSync(modeFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(modeFile, 'utf8'));
        currentMode = data.mode || 'public';
      } catch {}
    }

    if (!mode || !['public', 'private'].includes(mode)) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🌐 BOT MODE 〕━━━┈⊷
┃ Current: ${currentMode.toUpperCase()}
┃ 
┃ Usage: ${prefix}botmode public/private
┃ 
┃ 📌 Public - Everyone can use
┃ 📌 Private - Owner only
┃ 🧛 "Choose your darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    fs.writeFileSync(modeFile, JSON.stringify({ mode, updatedAt: new Date().toISOString() }, null, 2));
    process.env.BOT_MODE = mode;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ MODE UPDATED 〕━━━┈⊷
┃ Mode: ${mode.toUpperCase()}
┃ ${mode === 'private' ? '🔒 Owner only' : '🌐 Everyone can use'}
┃ 🧛 "The darkness adapts."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
