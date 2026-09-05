export default {
  name: 'antilink',
  description: 'Block links in group',
  category: 'group',
  aliases: ['linkprotect', 'nolink'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const sub = (args[0] || '').toLowerCase();

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (!global.antilinkGroups) global.antilinkGroups = new Set();
    const groupOn = global.antilinkGroups.has(chatId);

    if (!sub) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 ANTI-LINK STATUS 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage:
┃ ${prefix}antilink on  - Block all links
┃ ${prefix}antilink off - Allow links
┃ ${prefix}antilink status - Check status
┃ 
┃ 🧛 "Links are forbidden."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'on' || sub === 'enable') {
      global.antilinkGroups.add(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-LINK ENABLED 〕━━━┈⊷
┃ Links will be deleted.
┃ 🧛 "The coven is protected."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'off' || sub === 'disable') {
      global.antilinkGroups.delete(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-LINK DISABLED 〕━━━┈⊷
┃ Links are now allowed.
┃ 🧛 "The darkness welcomes all."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'status') {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 ANTI-LINK STATUS 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 👥 Groups: ${global.antilinkGroups.size}
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
