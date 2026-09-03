import fs from 'fs';

export default {
  name: 'antibadword',
  description: 'Toggle bad word filter in group',
  category: 'group',
  aliases: ['abw', 'antiprofanity'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const sub = (args[0] || '').toLowerCase();

    if (!chatId.endsWith('@g.us')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (!global.badwordGroups) global.badwordGroups = new Set();
    const groupOn = global.badwordGroups.has(chatId);

    if (!sub) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-BADWORD 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage:
┃ ${prefix}antibadword on  - Enable filter
┃ ${prefix}antibadword off - Disable filter
┃ 
┃ 🧛 "Bad words are forbidden."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const badWords = ['fuck', 'shit', 'bitch', 'asshole', 'bastard', 'damn', 'cunt', 'motherfucker', 'fucker', 'fag', 'retard', 'dumbass', 'whore', 'slut', 'pussy', 'dick', 'cock', 'penis', 'vagina', 'porn', 'sex', 'naked', 'strip', 'weed', 'cocaine', 'heroin', 'meth', 'crack', 'drugs'];

    if (sub === 'on') {
      global.badwordGroups.add(chatId);
      fs.writeFileSync('./badwords.json', JSON.stringify({
        words: badWords,
        groups: Array.from(global.badwordGroups),
        updatedAt: new Date().toISOString()
      }, null, 2));
      
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-BADWORD ENABLED 〕━━━┈⊷
┃ Profanity filter is now active.
┃ ${badWords.length} words blocked.
┃ 
┃ 🧛 "Purify the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (sub === 'off') {
      global.badwordGroups.delete(chatId);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-BADWORD DISABLED 〕━━━┈⊷
┃ Profanity filter removed.
┃ 
┃ 🧛 "The darkness is free."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}antibadword on/off
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
