import fs from 'fs';

export default {
  name: 'autolike',
  description: 'Toggle auto-like statuses',
  category: 'owner',
  aliases: ['like', 'statuslike'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    const likeFile = './auto_like.json';
    let currentStatus = false;

    if (fs.existsSync(likeFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(likeFile, 'utf8'));
        currentStatus = data.enabled || false;
      } catch {}
    }

    if (!mode || !['on', 'off', 'enable', 'disable', 'status'].includes(mode)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❤️ AUTO-LIKE 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage: ${prefix}autolike [on/off/status]
┃ 
┃ Examples:
┃ ${prefix}autolike on   - Enable auto-like
┃ ${prefix}autolike off  - Disable auto-like
┃ 
┃ 🧛 "The darkness likes..."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (mode === 'status') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❤️ AUTO-LIKE 〕━━━┈⊷
┃ 📌 Status: ${currentStatus ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ 🧛 "${currentStatus ? 'The darkness likes...' : 'The darkness is cold.'}"
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const enabled = (mode === 'on' || mode === 'enable');
    
    fs.writeFileSync(likeFile, JSON.stringify({ 
      enabled: enabled,
      updatedAt: new Date().toISOString(),
      updatedBy: msg.key.participant || msg.key.remoteJid
    }, null, 2));

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ AUTO-LIKE UPDATED 〕━━━┈⊷
┃ Status: ${enabled ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ ${enabled ? '❤️ Bot will like statuses' : '🚫 Bot will NOT like statuses'}
┃ 
┃ 🧛 "${enabled ? 'The darkness likes...' : 'The darkness is cold.'}"
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
