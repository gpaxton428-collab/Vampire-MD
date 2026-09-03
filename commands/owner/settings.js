import fs from 'fs';

export default {
  name: 'settings',
  description: 'View all bot settings',
  category: 'owner',
  aliases: ['set', 'config'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    // ─── FROM .env ───
    const botName = process.env.BOT_NAME || 'Vampire MD';
    const currentPrefix = process.env.PREFIX || '.';
    const footer = process.env.BOT_FOOTER || '> Powered by Vampire Tech';
    const ownerNumber = process.env.OWNER_NUMBER || 'Not set';

    // ─── FROM bot_settings.json ───
    let settings = {
      mode: 'public',
      autoReact: false,
      autoView: false,
      antiLink: false,
      antiDelete: false
    };

    if (fs.existsSync('./bot_settings.json')) {
      try {
        const data = JSON.parse(fs.readFileSync('./bot_settings.json', 'utf8'));
        settings = { ...settings, ...data };
      } catch {}
    }

    // Check auto-react from file
    let autoReactStatus = '❌ Disabled';
    if (fs.existsSync('./auto_react.json')) {
      try {
        const data = JSON.parse(fs.readFileSync('./auto_react.json', 'utf8'));
        autoReactStatus = data.enabled ? '✅ Enabled' : '❌ Disabled';
      } catch {}
    }

    // Check auto-view from file
    let autoViewStatus = '❌ Disabled';
    if (fs.existsSync('./auto_view_status.json')) {
      try {
        const data = JSON.parse(fs.readFileSync('./auto_view_status.json', 'utf8'));
        autoViewStatus = data.enabled ? '✅ Enabled' : '❌ Disabled';
      } catch {}
    }

    // Check anti-link from global
    let antiLinkStatus = '❌ Disabled';
    if (global.antilinkGroups && global.antilinkGroups.size > 0) {
      antiLinkStatus = `✅ Enabled (${global.antilinkGroups.size} groups)`;
    }

    // Check bot mode
    let modeStatus = 'public';
    if (fs.existsSync('./bot_mode.json')) {
      try {
        const data = JSON.parse(fs.readFileSync('./bot_mode.json', 'utf8'));
        modeStatus = data.mode || 'public';
      } catch {}
    }

    // Check anti-delete
    let antiDeleteStatus = '❌ Disabled';
    if (fs.existsSync('./antidelete.json')) {
      try {
        const data = JSON.parse(fs.readFileSync('./antidelete.json', 'utf8'));
        antiDeleteStatus = (data.group || data.private) ? '✅ Enabled' : '❌ Disabled';
      } catch {}
    }

    // Count commands
    let commandCount = 0;
    try {
      const commandFolders = fs.readdirSync('./commands').filter(f => fs.statSync(`./commands/${f}`).isDirectory());
      commandFolders.forEach(dir => {
        const files = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith('.js'));
        commandCount += files.length;
      });
    } catch {}

    // Get uptime
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ⚙️ BOT SETTINGS 〕━━━┈⊷
┃ 
┃ ─── 🤖 BOT INFO ───
┃ 📛 Name: ${botName}
┃ 🔤 Prefix: ${currentPrefix}
┃ 📝 Footer: ${footer}
┃ 👑 Owner: ${ownerNumber}
┃ 📊 Commands: ${commandCount}
┃ ⏱️ Uptime: ${hours}h ${minutes}m ${seconds}s
┃ 
┃ ─── ⚙️ FEATURES ───
┃ 🌐 Mode: ${modeStatus.toUpperCase()}
┃ ❤️ Auto-React: ${autoReactStatus}
┃ 👁️ Auto-View: ${autoViewStatus}
┃ 🔗 Anti-Link: ${antiLinkStatus}
┃ 🛡️ Anti-Delete: ${antiDeleteStatus}
┃ 
┃ ─── 📁 FILES USED ───
┃ 📄 .env - Environment variables
┃ 📄 bot_settings.json - Persistent settings
┃ 📄 bot_mode.json - Bot mode
┃ 📄 auto_react.json - Auto-react toggle
┃ 📄 auto_view_status.json - Auto-view toggle
┃ 
┃ ─── 📌 COMMANDS ───
┃ ${prefix}setprefix <new>  - Change prefix
┃ ${prefix}setbotname <name> - Change bot name
┃ ${prefix}setfooter <text> - Change footer
┃ ${prefix}autoreact on/off - Toggle auto-react
┃ ${prefix}statusview on/off - Toggle auto-view
┃ ${prefix}botmode public/private - Change mode
┃ 
┃ 🧛 "Control the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
