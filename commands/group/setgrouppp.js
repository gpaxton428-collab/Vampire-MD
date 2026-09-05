export default {
  name: 'setgrouppp',
  description: 'Set group profile picture',
  category: 'group',
  aliases: ['setgpp', 'grouppp'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    if (!quoted || !quoted.imageMessage) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🖼️ SET GROUP PP 〕━━━┈⊷
┃ Reply to an image!
┃ 
┃ Usage: Reply with ${prefix}setgrouppp
┃ 🧛 "Change the coven's banner."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const buffer = await sock.downloadMediaMessage(quoted);

      if (!buffer) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to download image.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      await sock.updateProfilePicture(chatId, buffer);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ GROUP PP UPDATED 〕━━━┈⊷
┃ 🧛 "The coven has a new banner."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
