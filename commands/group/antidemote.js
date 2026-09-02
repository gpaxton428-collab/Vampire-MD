export default {
  name: 'antidemote',
  description: 'Prevent admins from being demoted',
  category: 'group',
  aliases: ['antidem', 'ad'],
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

    if (!global.antidemoteGroups) global.antidemoteGroups = new Set();
    const groupOn = global.antidemoteGroups.has(chatId);

    if (!sub) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 ANTI-DEMOTE 〕━━━┈⊷
┃ Status: ${groupOn ? '🟢 ENABLED' : '🔴 DISABLED'}
┃ 
┃ Usage:
┃ ${prefix}antidemote on  - Enable protection
┃ ${prefix}antidemote off - Disable protection
┃ 
┃ 🧛 "Admins are protected."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (sub === 'on') {
      global.antidemoteGroups.add(chatId);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-DEMOTE ENABLED 〕━━━┈⊷
┃ Admins cannot be demoted.
┃ 
┃ 🧛 "Power is protected."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (sub === 'off') {
      global.antidemoteGroups.delete(chatId);
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-DEMOTE DISABLED 〕━━━┈⊷
┃ Admins can now be demoted.
┃ 
┃ 🧛 "Power is vulnerable."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}antidemote on/off
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
