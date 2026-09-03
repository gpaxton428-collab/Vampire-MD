import fs from 'fs';

export default {
  name: 'autostatusreact',
  description: 'Toggle auto-react to statuses',
  category: 'owner',
  aliases: ['statusreact', 'sreact'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    const statusReactFile = './auto_status_react.json';
    let currentStatus = false;

    if (fs.existsSync(statusReactFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(statusReactFile, 'utf8'));
        currentStatus = data.enabled || false;
      } catch {}
    }

    if (!mode || !['on', 'off', 'enable', 'disable', 'status'].includes(mode)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❤️ AUTO-STATUS REACT 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage: ${prefix}autostatusreact [on/off/status]
┃ 
┃ Examples:
┃ ${prefix}autostatusreact on   - Enable auto-status react
┃ ${prefix}autostatusreact off  - Disable auto-status react
┃ 
┃ 🧛 "The darkness reacts to statuses."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (mode === 'status') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❤️ AUTO-STATUS REACT 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ 🧛 "${currentStatus ? 'The darkness reacts.' : 'The darkness is silent.'}"
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const enabled = (mode === 'on' || mode === 'enable');
    
    fs.writeFileSync(statusReactFile, JSON.stringify({ 
      enabled: enabled,
      updatedAt: new Date().toISOString(),
      updatedBy: msg.key.participant || msg.key.remoteJid
    }, null, 2));

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ AUTO-STATUS REACT UPDATED 〕━━━┈⊷
┃ Status: ${enabled ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ ${enabled ? '❤️ Bot will react to statuses' : '🚫 Bot will NOT react to statuses'}
┃ 
┃ 🧛 "${enabled ? 'The darkness reacts.' : 'The darkness is silent.'}"
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
