import fs from 'fs';

export default {
  name: 'reactdev',
  description: 'Toggle auto-react to developer messages',
  category: 'owner',
  aliases: ['devreact'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    const devFile = './reactdev.json';
    let currentStatus = false;

    if (fs.existsSync(devFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(devFile, 'utf8'));
        currentStatus = data.enabled || false;
      } catch {}
    }

    if (!mode || !['on', 'off', 'status'].includes(mode)) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🧛 REACT DEV 〕━━━┈⊷
┃ Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage:
┃ ${prefix}reactdev on  - Enable
┃ ${prefix}reactdev off - Disable
┃ ${prefix}reactdev status - Check status
┃ 
┃ 🧛 "The darkness reacts."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (mode === 'status') {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🧛 REACT DEV STATUS 〕━━━┈⊷
┃ Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 🧛 "${currentStatus ? 'The darkness reacts to devs.' : 'The darkness is silent.'}"
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const enabled = mode === 'on';
    fs.writeFileSync(devFile, JSON.stringify({ enabled, updatedAt: new Date().toISOString() }, null, 2));

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ REACT DEV UPDATED 〕━━━┈⊷
┃ Status: ${enabled ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ ${enabled ? '🧛 Bot will react to developer messages' : '🚫 Bot will NOT react'}
┃ 🧛 "${enabled ? 'The darkness reacts.' : 'The darkness is silent.'}"
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
