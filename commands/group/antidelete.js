export default {
  name: 'antidelete',
  description: 'Prevent messages from being deleted',
  category: 'group',
  aliases: ['nodelete', 'ad'],
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

    if (!global.antideleteGroups) global.antideleteGroups = new Set();
    const groupOn = global.antideleteGroups.has(chatId);

    if (!sub) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-DELETE STATUS 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage:
┃ ${prefix}antidelete on  - Prevent deletions
┃ ${prefix}antidelete off - Allow deletions
┃ ${prefix}antidelete status - Check status
┃ 
┃ 🧛 "Messages are eternal."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'on' || sub === 'enable') {
      global.antideleteGroups.add(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-DELETE ENABLED 〕━━━┈⊷
┃ Messages cannot be deleted.
┃ 🧛 "The darkness remembers."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'off' || sub === 'disable') {
      global.antideleteGroups.delete(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-DELETE DISABLED 〕━━━┈⊷
┃ Messages can now be deleted.
┃ 🧛 "The darkness forgets."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'status') {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-DELETE STATUS 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 👥 Groups: ${global.antideleteGroups.size}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    return sock.sendMessage(chatId, {
      text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}antidelete on/off/status
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
