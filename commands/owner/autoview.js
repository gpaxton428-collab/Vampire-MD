import fs from 'fs';

export default {
  name: 'autoview',
  description: 'Toggle auto-view status feature',
  category: 'owner',
  aliases: ['viewstatus', 'autostatus'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();

    const viewFile = './auto_view_status.json';
    let currentMode = true;

    if (fs.existsSync(viewFile)) {
      const data = JSON.parse(fs.readFileSync(viewFile, 'utf8'));
      currentMode = data.enabled !== undefined ? data.enabled : true;
    }

    if (!mode || !['on', 'off', 'enable', 'disable'].includes(mode)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👁️ AUTO VIEW STATUS 〕━━━┈⊷
┃ Status: ${currentMode ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage: ${prefix}autoview [on/off]
┃ 
┃ Example: ${prefix}autoview on
┃ Example: ${prefix}autoview off
┃ 
┃ 🧛 "Control what the darkness sees."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const enabled = mode === 'on' || mode === 'enable';
    
    fs.writeFileSync(viewFile, JSON.stringify({ 
      enabled: enabled,
      updatedAt: new Date().toISOString(),
      updatedBy: msg.key.participant || msg.key.remoteJid
    }, null, 2));

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ AUTO VIEW STATUS 〕━━━┈⊷
┃ Status: ${enabled ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ ${enabled ? '👁️ Bot will automatically view statuses' : '🚫 Bot will not view statuses'}
┃ 
┃ 🧛 "The darkness sees all."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
