export default {
  name: 'groupsettings',
  description: 'View or change group settings',
  category: 'group',
  aliases: ['gsettings', 'gset'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    if (!chatId.endsWith('@g.us')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const sub = args[0]?.toLowerCase();

    try {
      const groupMetadata = await sock.groupMetadata(chatId);
      const settings = groupMetadata.announce ? 'CLOSED 🔒' : 'OPEN 🔓';
      const restrict = groupMetadata.restrict ? 'ADMIN ONLY 👑' : 'ALL MEMBERS 👥';

      if (!sub) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ⚙️ GROUP SETTINGS 〕━━━┈⊷
┃ 📌 Name: ${groupMetadata.subject}
┃ 🔐 Mode: ${settings}
┃ 🛡️ Messages: ${restrict}
┃ 
┃ Usage:
┃ ${prefix}groupsettings close   - Close group
┃ ${prefix}groupsettings open    - Open group
┃ ${prefix}groupsettings admin   - Admin only messages
┃ ${prefix}groupsettings all     - All members can send
┃ 
┃ 🧛 "Control the coven."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      if (sub === 'close' || sub === 'lock') {
        await sock.groupSettingUpdate(chatId, 'announcement');
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 🔒 GROUP CLOSED 〕━━━┈⊷
┃ Only admins can send messages.
┃ 
┃ 🧛 "The coven is sealed."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else if (sub === 'open' || sub === 'unlock') {
        await sock.groupSettingUpdate(chatId, 'not_announcement');
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 🔓 GROUP OPENED 〕━━━┈⊷
┃ All members can send messages.
┃ 
┃ 🧛 "The coven is open."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else if (sub === 'admin' || sub === 'admins') {
        await sock.groupSettingUpdate(chatId, 'locked');
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👑 ADMIN ONLY 〕━━━┈⊷
┃ Only admins can change group settings.
┃ 
┃ 🧛 "Power is protected."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else if (sub === 'all' || sub === 'everyone') {
        await sock.groupSettingUpdate(chatId, 'unlocked');
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👥 ALL MEMBERS 〕━━━┈⊷
┃ All members can change group settings.
┃ 
┃ 🧛 "Power is shared."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Invalid option.
┃ Options: close, open, admin, all
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
