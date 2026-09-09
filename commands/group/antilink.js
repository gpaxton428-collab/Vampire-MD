import fs from 'fs';

export default {
  name: 'antilink',
  description: 'Block links in group',
  category: 'group',
  aliases: ['linkprotect', 'nolink'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const sub = args[0]?.toLowerCase();

    const configFile = './antilink.json';
    let config = {};
    if (fs.existsSync(configFile)) {
      try {
        config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      } catch {}
    }

    if (!config[chatId]) config[chatId] = { enabled: false };

    if (!sub || !['on', 'off', 'status'].includes(sub)) {
      const status = config[chatId].enabled ? '🟢 ENABLED' : '🔴 DISABLED';
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 ANTI-LINK STATUS 〕━━━┈⊷
┃ Status: ${status}
┃ 
┃ Usage:
┃ ${prefix}antilink on  - Block links
┃ ${prefix}antilink off - Allow links
┃ ${prefix}antilink status - Check status
┃ 
┃ 🧛 "Links are forbidden."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'on' || sub === 'enable') {
      config[chatId].enabled = true;
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

      // Hook into messages
      if (!global.antilinkHooked) {
        global.antilinkHooked = true;
        sock.ev.on('messages.upsert', async ({ messages }) => {
          const msg = messages[0];
          if (!msg.message || msg.key.fromMe) return;
          const chatId = msg.key.remoteJid;
          if (!config[chatId]?.enabled) return;

          const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
          if (text.match(/(https?:\/\/[^\s]+)/)) {
            try {
              await sock.sendMessage(chatId, { delete: msg.key });
            } catch {}
          }
        });
      }

      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-LINK ENABLED 〕━━━┈⊷
┃ Links will be deleted!
┃ 🧛 "The coven is protected."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'off' || sub === 'disable') {
      config[chatId].enabled = false;
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-LINK DISABLED 〕━━━┈⊷
┃ Links are now allowed.
┃ 🧛 "The darkness welcomes all."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'status') {
      const status = config[chatId].enabled ? '🟢 ENABLED' : '🔴 DISABLED';
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 ANTI-LINK STATUS 〕━━━┈⊷
┃ Status: ${status}
┃ 🧛 "The darkness watches."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    return sock.sendMessage(chatId, {
      text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}antilink on/off/status
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
