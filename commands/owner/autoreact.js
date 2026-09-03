import fs from 'fs';

export default {
  name: 'autoreact',
  description: 'Toggle auto-react feature',
  category: 'owner',
  aliases: ['react', 'autoreacton', 'autoreactoff'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    const reactFile = './auto_react.json';
    let currentStatus = false;

    if (fs.existsSync(reactFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(reactFile, 'utf8'));
        currentStatus = data.enabled || false;
      } catch {}
    }

    if (!mode || !['on', 'off', 'enable', 'disable', 'status'].includes(mode)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❤️ AUTO-REACT 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage: ${prefix}autoreact [on/off/status]
┃ 
┃ Examples:
┃ ${prefix}autoreact on     - Enable auto-react
┃ ${prefix}autoreact off    - Disable auto-react
┃ ${prefix}autoreact status - Check status
┃ 
┃ 🧛 "The darkness reacts."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (mode === 'status') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❤️ AUTO-REACT STATUS 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ 🧛 "${currentStatus ? 'The darkness embraces all.' : 'The darkness is silent.'}"
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const enabled = (mode === 'on' || mode === 'enable');
    
    fs.writeFileSync(reactFile, JSON.stringify({ 
      enabled: enabled,
      updatedAt: new Date().toISOString(),
      updatedBy: msg.key.participant || msg.key.remoteJid,
      reactEmojis: ['🧛', '🩸', '🌑', '👻', '🦇', '💀', '🔥', '⚡', '❤️', '😂', '😍', '🙏']
    }, null, 2));

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ AUTO-REACT UPDATED 〕━━━┈⊷
┃ Status: ${enabled ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ ${enabled ? '❤️ Bot will auto-react to messages' : '🚫 Bot will NOT auto-react'}
┃ 
┃ 🧛 "${enabled ? 'The darkness reacts to all.' : 'The darkness is silent.'}"
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
