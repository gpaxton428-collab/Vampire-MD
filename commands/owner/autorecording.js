import fs from 'fs';

export default {
  name: 'autorecording',
  description: 'Toggle auto-recording feature',
  category: 'owner',
  aliases: ['recording', 'autorecord'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    const recordingFile = './auto_recording.json';
    let currentStatus = false;

    if (fs.existsSync(recordingFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(recordingFile, 'utf8'));
        currentStatus = data.enabled || false;
      } catch {}
    }

    if (!mode || !['on', 'off', 'enable', 'disable', 'status'].includes(mode)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🎙️ AUTO-RECORDING 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage: ${prefix}autorecording [on/off/status]
┃ 
┃ Examples:
┃ ${prefix}autorecording on   - Enable auto-recording
┃ ${prefix}autorecording off  - Disable auto-recording
┃ 
┃ 🧛 "The darkness records..."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (mode === 'status') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🎙️ AUTO-RECORDING 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ 🧛 "${currentStatus ? 'The darkness records...' : 'The darkness is silent.'}"
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const enabled = (mode === 'on' || mode === 'enable');
    
    fs.writeFileSync(recordingFile, JSON.stringify({ 
      enabled: enabled,
      updatedAt: new Date().toISOString(),
      updatedBy: msg.key.participant || msg.key.remoteJid
    }, null, 2));

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ AUTO-RECORDING UPDATED 〕━━━┈⊷
┃ Status: ${enabled ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ ${enabled ? '🎙️ Bot will show recording indicator' : '🚫 Bot will NOT show recording'}
┃ 
┃ 🧛 "${enabled ? 'The darkness records...' : 'The darkness is silent.'}"
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
