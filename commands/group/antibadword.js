export default {
  name: 'antibadword',
  description: 'Block bad words in group',
  category: 'group',
  aliases: ['abw', 'antiprofanity'],
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

    if (!global.badwordGroups) global.badwordGroups = new Set();
    const groupOn = global.badwordGroups.has(chatId);

    if (!sub) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-BADWORD STATUS 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage:
┃ ${prefix}antibadword on  - Block bad words
┃ ${prefix}antibadword off - Allow bad words
┃ ${prefix}antibadword status - Check status
┃ 
┃ 🧛 "Bad words are forbidden."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'on' || sub === 'enable') {
      global.badwordGroups.add(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-BADWORD ENABLED 〕━━━┈⊷
┃ Bad words will be deleted.
┃ 🧛 "The coven is pure."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'off' || sub === 'disable') {
      global.badwordGroups.delete(chatId);
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-BADWORD DISABLED 〕━━━┈⊷
┃ Bad words are now allowed.
┃ 🧛 "The darkness is free."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'status') {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-BADWORD STATUS 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 👥 Groups: ${global.badwordGroups.size}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    return sock.sendMessage(chatId, {
      text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}antibadword on/off/status
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
