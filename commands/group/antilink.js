import fs from 'fs';

export default {
  name: 'antilink',
  description: 'Toggle antilink protection in a group. Deletes any message containing a URL.',
  category: 'group',
  aliases: ['linkprotect'],
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

    // Initialize global set if not exists
    if (!global.antilinkGroups) global.antilinkGroups = new Set();

    const groupOn = global.antilinkGroups.has(chatId);

    if (!sub) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔗 ANTI-LINK 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage:
┃ ${prefix}antilink on  - Enable for this group
┃ ${prefix}antilink off - Disable for this group
┃ 
┃ 🧛 "Links are forbidden in the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (sub === 'on') {
      global.antilinkGroups.add(chatId);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-LINK ENABLED 〕━━━┈⊷
┃ Any message containing a link will be deleted.
┃ 
┃ 🧛 "The coven is protected."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (sub === 'off') {
      global.antilinkGroups.delete(chatId);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-LINK DISABLED 〕━━━┈⊷
┃ Links are now allowed in this group.
┃ 
┃ 🧛 "The darkness welcomes all."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}antilink on or ${prefix}antilink off
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
