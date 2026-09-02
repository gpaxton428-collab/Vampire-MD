import fs from 'fs';

// Global settings map
if (!global.welcomeSettings) {
  global.welcomeSettings = new Map();
}

export default {
  name: 'welcome',
  description: 'Auto-welcome new members',
  category: 'group',
  aliases: ['goodbye', 'setwelcome', 'setgoodbye', 'welcomeoff', 'goodbyeoff'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const rawCmd = (msg.message?.extendedTextMessage?.text || msg.message?.conversation || '').trim().split(/\s+/)[0].replace(/^\./, '').toLowerCase();

    if (!chatId.endsWith('@g.us')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    // Check if user is admin
    const groupMeta = await sock.groupMetadata(chatId);
    const sender = msg.key.participant || msg.key.remoteJid;
    const isAdmin = groupMeta.participants.some(p => p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin'));

    if (!isAdmin) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ⛔ ADMIN ONLY 〕━━━┈⊷
┃ Only admins can configure welcome messages.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const settings = global.welcomeSettings.get(chatId) || { 
      welcome: false, 
      goodbye: false, 
      customWelcome: '', 
      customGoodbye: '' 
    };

    // Welcome command
    if (rawCmd === 'welcome') {
      const sub = (args[0] || '').toLowerCase();
      if (sub === 'on') {
        settings.welcome = true;
        global.welcomeSettings.set(chatId, settings);
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👋 WELCOME ON 〕━━━┈⊷
┃ New members will be greeted automatically.
┃ 
┃ Customise with: ${prefix}setwelcome Your message {name}
┃ 
┃ 🧛 "The coven welcomes you."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }
      if (sub === 'off') {
        settings.welcome = false;
        global.welcomeSettings.set(chatId, settings);
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👋 WELCOME OFF 〕━━━┈⊷
┃ Welcome messages disabled.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }
      const status = settings.welcome ? '🟢 ENABLED' : '🔴 DISABLED';
      const custom = settings.customWelcome ? `\n┃ *Custom:* ${settings.customWelcome}` : '';
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👋 WELCOME STATUS 〕━━━┈⊷
┃ Status: ${status}${custom}
┃ 
┃ Commands:
┃ ${prefix}welcome on/off
┃ ${prefix}setwelcome Your message {name}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    // Goodbye command
    if (rawCmd === 'goodbye') {
      const sub = (args[0] || '').toLowerCase();
      if (sub === 'on') {
        settings.goodbye = true;
        global.welcomeSettings.set(chatId, settings);
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👋 GOODBYE ON 〕━━━┈⊷
┃ Members who leave will get a farewell.
┃ 
┃ Customise with: ${prefix}setgoodbye Your message {name}
┃ 
┃ 🧛 "Farewell, dear one."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }
      if (sub === 'off') {
        settings.goodbye = false;
        global.welcomeSettings.set(chatId, settings);
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👋 GOODBYE OFF 〕━━━┈⊷
┃ Goodbye messages disabled.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }
      const status = settings.goodbye ? '🟢 ENABLED' : '🔴 DISABLED';
      const custom = settings.customGoodbye ? `\n┃ *Custom:* ${settings.customGoodbye}` : '';
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👋 GOODBYE STATUS 〕━━━┈⊷
┃ Status: ${status}${custom}
┃ 
┃ Commands:
┃ ${prefix}goodbye on/off
┃ ${prefix}setgoodbye Your message {name}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    // Set Welcome
    if (rawCmd === 'setwelcome') {
      const customMsg = args.join(' ').trim();
      if (!customMsg) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Provide a message. Use {name} for member's name.
┃ 
┃ Example: ${prefix}setwelcome Welcome {name}! 🎉
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }
      settings.customWelcome = customMsg;
      settings.welcome = true;
      global.welcomeSettings.set(chatId, settings);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ WELCOME SET 〕━━━┈⊷
┃ ${customMsg}
┃ 
┃ 🧛 "The coven welcomes you."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    // Set Goodbye
    if (rawCmd === 'setgoodbye') {
      const customMsg = args.join(' ').trim();
      if (!customMsg) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Provide a message. Use {name} for member's name.
┃ 
┃ Example: ${prefix}setgoodbye Goodbye {name}! 👋
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }
      settings.customGoodbye = customMsg;
      settings.goodbye = true;
      global.welcomeSettings.set(chatId, settings);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ GOODBYE SET 〕━━━┈⊷
┃ ${customMsg}
┃ 
┃ 🧛 "Farewell, dear one."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    // Welcome Off
    if (rawCmd === 'welcomeoff') {
      settings.welcome = false;
      global.welcomeSettings.set(chatId, settings);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👋 WELCOME OFF 〕━━━┈⊷
┃ Welcome messages disabled.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    // Goodbye Off
    if (rawCmd === 'goodbyeoff') {
      settings.goodbye = false;
      global.welcomeSettings.set(chatId, settings);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👋 GOODBYE OFF 〕━━━┈⊷
┃ Goodbye messages disabled.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
