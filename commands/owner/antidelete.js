export default {
  name: 'antidelete',
  description: 'Toggle anti-delete — recovers deleted and edited messages',
  category: 'owner',
  aliases: ['antidel'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const action = (args[0] || '').toLowerCase();

    const antideleteFile = './antidelete.json';
    let settings = { group: true, private: true };

    // Load current settings
    if (fs.existsSync(antideleteFile)) {
      try {
        settings = JSON.parse(fs.readFileSync(antideleteFile, 'utf8'));
      } catch {}
    }

    if (action === 'on') {
      settings.group = true;
      settings.private = true;
      fs.writeFileSync(antideleteFile, JSON.stringify(settings, null, 2));

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-DELETE ON 〕━━━┈⊷
┃ Deleted and edited messages will be recovered.
┃ 
┃ 📌 Groups: ✅ ON
┃ 📌 Private: ✅ ON
┃ 
┃ 🧛 "The darkness remembers everything."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (action === 'off') {
      settings.group = false;
      settings.private = false;
      fs.writeFileSync(antideleteFile, JSON.stringify(settings, null, 2));

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-DELETE OFF 〕━━━┈⊷
┃ 📌 Groups: ❌ OFF
┃ 📌 Private: ❌ OFF
┃ 
┃ 🧛 "The darkness forgets."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    // Show status
    const groupStatus = settings.group ? '✅ ON' : '❌ OFF';
    const privateStatus = settings.private ? '✅ ON' : '❌ OFF';

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🛡️ ANTI-DELETE STATUS 〕━━━┈⊷
┃ 📌 Groups: ${groupStatus}
┃ 📌 Private: ${privateStatus}
┃ 
┃ Usage:
┃ ${prefix}antidelete on  - Enable anti-delete
┃ ${prefix}antidelete off - Disable anti-delete
┃ 
┃ 🧛 "What is deleted, shall be remembered."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
