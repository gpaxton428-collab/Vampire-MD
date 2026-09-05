export default {
  name: 'welcome',
  description: 'Toggle welcome messages',
  category: 'group',
  aliases: ['welcomemsg'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const mode = args[0]?.toLowerCase();

    if (!mode || !['on', 'off', 'status'].includes(mode)) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👋 WELCOME 〕━━━┈⊷
┃ Usage:
┃ ${prefix}welcome on  - Enable
┃ ${prefix}welcome off - Disable
┃ ${prefix}welcome status - Check status
┃ 🧛 "Welcome the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const welcomeFile = './welcome.json';
    let settings = {};
    if (fs.existsSync(welcomeFile)) {
      try {
        settings = JSON.parse(fs.readFileSync(welcomeFile, 'utf8'));
      } catch {}
    }

    if (!settings[chatId]) settings[chatId] = { enabled: false };

    if (mode === 'on') {
      settings[chatId].enabled = true;
      fs.writeFileSync(welcomeFile, JSON.stringify(settings, null, 2));
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ WELCOME ENABLED 〕━━━┈⊷
┃ New members will be welcomed.
┃ 🧛 "The coven welcomes."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (mode === 'off') {
      settings[chatId].enabled = false;
      fs.writeFileSync(welcomeFile, JSON.stringify(settings, null, 2));
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ WELCOME DISABLED 〕━━━┈⊷
┃ 🧛 "The coven is silent."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (mode === 'status') {
      const status = settings[chatId]?.enabled ? '🟢 ENABLED' : '🔴 DISABLED';
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👋 WELCOME STATUS 〕━━━┈⊷
┃ Status: ${status}
┃ 🧛 "The darkness welcomes."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
