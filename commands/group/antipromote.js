export default {
  name: 'antipromote',
  description: 'Prevent members from being promoted to admin',
  category: 'group',
  aliases: ['antiprom', 'ap'],
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

    if (!global.antipromoteGroups) global.antipromoteGroups = new Set();
    const groupOn = global.antipromoteGroups.has(chatId);

    if (!sub) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 ANTI-PROMOTE STATUS 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage:
┃ ${prefix}antipromote on  - Enable protection
┃ ${prefix}antipromote off - Disable protection
┃ ${prefix}antipromote status - Check status
┃ 
┃ 🧛 "Power is controlled."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'on' || sub === 'enable') {
      global.antipromoteGroups.add(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-PROMOTE ENABLED 〕━━━┈⊷
┃ Members cannot be promoted.
┃ 🧛 "Power is contained."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'off' || sub === 'disable') {
      global.antipromoteGroups.delete(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-PROMOTE DISABLED 〕━━━┈⊷
┃ Members can now be promoted.
┃ 🧛 "Power is free."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'status') {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 ANTI-PROMOTE STATUS 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 👥 Groups: ${global.antipromoteGroups.size}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    return sock.sendMessage(chatId, {
      text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}antipromote on/off/status
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
