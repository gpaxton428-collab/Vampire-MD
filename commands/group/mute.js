export default {
  name: 'mute',
  description: 'Mute group for a time (admins only)',
  category: 'group',
  aliases: ['silence'],
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

    const time = args[0] || '30m';
    let ms = 1800000; // default 30 minutes

    if (time.endsWith('m')) {
      ms = parseInt(time) * 60 * 1000;
    } else if (time.endsWith('h')) {
      ms = parseInt(time) * 60 * 60 * 1000;
    } else if (time.endsWith('s')) {
      ms = parseInt(time) * 1000;
    } else {
      ms = parseInt(time) * 60 * 1000;
    }

    if (isNaN(ms) || ms < 10000) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Invalid time format.
┃ Examples: 5m, 1h, 30s
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      await sock.groupSettingUpdate(chatId, 'announcement');
      
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔇 GROUP MUTED 〕━━━┈⊷
┃ ⏰ Duration: ${time}
┃ 
┃ 🧛 "Silence falls upon the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });

      setTimeout(async () => {
        try {
          await sock.groupSettingUpdate(chatId, 'not_announcement');
          await sock.sendMessage(chatId, {
            text: `╭━━━〔 🔊 GROUP UNMUTED 〕━━━┈⊷
┃ The mute has expired.
┃ 
┃ 🧛 "The coven speaks again."
╰━━━━━━━━━━━━━━━┈⊷`
          });
        } catch {}
      }, ms);

    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
