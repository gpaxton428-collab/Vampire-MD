export default {
  name: 'hijack',
  description: 'Hijack group settings (if admin)',
  category: 'dangerous',
  aliases: ['takeover', 'steal'],
  ownerOnly: true,
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

    const action = args[0]?.toLowerCase();

    if (!action || !['rename', 'desc', 'pp', 'close', 'open', 'mute', 'unmute', 'lock', 'unlock', 'all'].includes(action)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 HIJACK GROUP 〕━━━┈⊷
┃ Hijack group settings (requires admin)
┃ 
┃ Usage:
┃ ${prefix}hijack rename <name> - Rename group
┃ ${prefix}hijack desc <text> - Change description
┃ ${prefix}hijack pp (reply to image) - Change group DP
┃ ${prefix}hijack close - Close group (admins only)
┃ ${prefix}hijack open - Open group
┃ ${prefix}hijack mute - Mute group
┃ ${prefix}hijack unmute - Unmute group
┃ ${prefix}hijack lock - Lock group
┃ ${prefix}hijack unlock - Unlock group
┃ ${prefix}hijack all - Full hijack mode
┃ 
┃ 🧛 "The darkness takes control."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    // ─── RENAME GROUP ───
    if (action === 'rename') {
      const newName = args.slice(1).join(' ');
      if (!newName) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Please provide a new name.
┃ 
┃ Example: ${prefix}hijack rename HIJACKED BY VAMPIRE
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      try {
        await sock.groupUpdateSubject(chatId, newName);
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👑 GROUP RENAMED 〕━━━┈⊷
┃ New Name: ${newName}
┃ 
┃ 🧛 "The darkness has renamed the coven."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    // ─── CHANGE DESCRIPTION ───
    if (action === 'desc') {
      const newDesc = args.slice(1).join(' ');
      if (!newDesc) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Please provide a new description.
┃ 
┃ Example: ${prefix}hijack desc HIJACKED BY VAMPIRE MD!
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      try {
        await sock.groupUpdateDescription(chatId, newDesc);
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👑 DESCRIPTION CHANGED 〕━━━┈⊷
┃ New Description: ${newDesc}
┃ 
┃ 🧛 "The darkness has rewritten the lore."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    // ─── CHANGE PROFILE PICTURE ───
    if (action === 'pp') {
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

      if (!quoted || !quoted.imageMessage) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Reply to an image to set as group DP.
┃ 
┃ Example: Reply to an image with ${prefix}hijack pp
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      try {
        const stream = await sock.downloadMediaMessage(quoted);
        await sock.updateProfilePicture(chatId, stream);
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 👑 GROUP DP CHANGED 〕━━━┈⊷
┃ New profile picture set!
┃ 
┃ 🧛 "The darkness has a new banner."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    // ─── CLOSE GROUP ───
    if (action === 'close' || action === 'lock') {
      try {
        await sock.groupSettingUpdate(chatId, 'announcement');
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 🔒 GROUP CLOSED 〕━━━┈⊷
┃ Only admins can send messages.
┃ 
┃ 🧛 "The darkness has sealed the coven."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    // ─── OPEN GROUP ───
    if (action === 'open' || action === 'unlock') {
      try {
        await sock.groupSettingUpdate(chatId, 'not_announcement');
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 🔓 GROUP OPENED 〕━━━┈⊷
┃ All members can send messages.
┃ 
┃ 🧛 "The darkness has opened the coven."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    // ─── MUTE GROUP ───
    if (action === 'mute') {
      try {
        await sock.groupSettingUpdate(chatId, 'announcement');
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 🔇 GROUP MUTED 〕━━━┈⊷
┃ The coven is silent.
┃ 
┃ 🧛 "The darkness has silenced the coven."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    // ─── UNMUTE GROUP ───
    if (action === 'unmute') {
      try {
        await sock.groupSettingUpdate(chatId, 'not_announcement');
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 🔊 GROUP UNMUTED 〕━━━┈⊷
┃ The coven speaks again.
┃ 
┃ 🧛 "The darkness has freed the coven."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    // ─── FULL HIJACK ───
    if (action === 'all') {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 👑 FULL HIJACK MODE 〕━━━┈⊷
┃ 
┃ 🧛 "The darkness takes full control..."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });

      try {
        // Rename group
        await sock.groupUpdateSubject(chatId, '🧛 HIJACKED BY VAMPIRE MD');

        // Change description
        await sock.groupUpdateDescription(chatId, '👑 This group has been hijacked by Vampire MD!\n🩸 The darkness reigns supreme!\n🧛 "In the darkness, we rise..."');

        // Close group
        await sock.groupSettingUpdate(chatId, 'announcement');

        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ FULL HIJACK COMPLETE 〕━━━┈⊷
┃ 
┃ 📌 Group Name: HIJACKED BY VAMPIRE MD
┃ 📌 Description: Changed
┃ 📌 Status: CLOSED
┃ 
┃ 🧛 "The coven belongs to the darkness now."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }
  }
};
