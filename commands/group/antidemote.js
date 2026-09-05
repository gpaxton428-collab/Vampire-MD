export default {
  name: 'antidemote',
  description: 'Prevent admins from being demoted',
  category: 'group',
  aliases: ['antidem', 'ad'],
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

    if (!global.antidemoteGroups) global.antidemoteGroups = new Set();
    const groupOn = global.antidemoteGroups.has(chatId);

    if (!sub) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 ANTI-DEMOTE STATUS 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage:
┃ ${prefix}antidemote on  - Enable protection
┃ ${prefix}antidemote off - Disable protection
┃ ${prefix}antidemote status - Check status
┃ 
┃ 🧛 "Admins are protected."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'on' || sub === 'enable') {
      global.antidemoteGroups.add(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-DEMOTE ENABLED 〕━━━┈⊷
┃ Admins cannot be demoted.
┃ 🧛 "Power is protected."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'off' || sub === 'disable') {
      global.antidemoteGroups.delete(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-DEMOTE DISABLED 〕━━━┈⊷
┃ Admins can now be demoted.
┃ 🧛 "Power is vulnerable."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'status') {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 ANTI-DEMOTE STATUS 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 👥 Groups: ${global.antidemoteGroups.size}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    return sock.sendMessage(chatId, {
      text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}antidemote on/off/status
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
