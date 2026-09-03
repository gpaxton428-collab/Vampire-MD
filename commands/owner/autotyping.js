import fs from 'fs';

export default {
  name: 'autotyping',
  description: 'Toggle auto-typing feature',
  category: 'owner',
  aliases: ['typing', 'autotype'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    const typingFile = './auto_typing.json';
    let currentStatus = false;

    if (fs.existsSync(typingFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(typingFile, 'utf8'));
        currentStatus = data.enabled || false;
      } catch {}
    }

    if (!mode || !['on', 'off', 'enable', 'disable', 'status'].includes(mode)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ⌨️ AUTO-TYPING 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage: ${prefix}autotyping [on/off/status]
┃ 
┃ Examples:
┃ ${prefix}autotyping on   - Enable auto-typing
┃ ${prefix}autotyping off  - Disable auto-typing
┃ 
┃ 🧛 "The darkness types..."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (mode === 'status') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ⌨️ AUTO-TYPING 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ 🧛 "${currentStatus ? 'The darkness types...' : 'The darkness is silent.'}"
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const enabled = (mode === 'on' || mode === 'enable');
    
    fs.writeFileSync(typingFile, JSON.stringify({ 
      enabled: enabled,
      updatedAt: new Date().toISOString(),
      updatedBy: msg.key.participant || msg.key.remoteJid
    }, null, 2));

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ AUTO-TYPING UPDATED 〕━━━┈⊷
┃ Status: ${enabled ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ ${enabled ? '⌨️ Bot will show typing indicator' : '🚫 Bot will NOT show typing'}
┃ 
┃ 🧛 "${enabled ? 'The darkness types...' : 'The darkness is silent.'}"
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
