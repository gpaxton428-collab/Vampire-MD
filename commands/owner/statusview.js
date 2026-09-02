import fs from 'fs';

export default {
  name: 'statusview',
  description: 'Toggle auto-view status feature',
  category: 'owner',
  aliases: ['autoview', 'viewstatus'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    const viewFile = './auto_view_status.json';
    let currentStatus = false;

    if (fs.existsSync(viewFile)) {
      const data = JSON.parse(fs.readFileSync(viewFile, 'utf8'));
      currentStatus = data.enabled || false;
    }

    if (!mode || !['on', 'off', 'enable', 'disable', 'status'].includes(mode)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👁️ STATUS VIEW 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage: ${prefix}statusview [on/off/status]
┃ 
┃ Examples:
┃ ${prefix}statusview on   - Enable auto-view
┃ ${prefix}statusview off  - Disable auto-view
┃ ${prefix}statusview status - Check current status
┃ 
┃ 🧛 "The darkness sees all."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (mode === 'status') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👁️ STATUS VIEW 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ 👁️ Bot will ${currentStatus ? 'automatically view' : 'NOT view'} statuses
┃ 
┃ 🧛 "The darkness ${currentStatus ? 'sees all' : 'is blind'}."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const enabled = (mode === 'on' || mode === 'enable');
    
    fs.writeFileSync(viewFile, JSON.stringify({ 
      enabled: enabled,
      updatedAt: new Date().toISOString(),
      updatedBy: msg.key.participant || msg.key.remoteJid
    }, null, 2));

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ STATUS VIEW UPDATED 〕━━━┈⊷
┃ Status: ${enabled ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ ${enabled ? '👁️ Bot will automatically view statuses' : '🚫 Bot will NOT view statuses'}
┃ 
┃ 🧛 "${enabled ? 'The darkness sees all.' : 'The darkness is blind.'}"
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
