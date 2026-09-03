export default {
  name: 'spam',
  description: 'Spam a user with messages',
  category: 'dangerous',
  aliases: ['flood', 'mass'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];
    const count = parseInt(args[1]) || 5;
    const message = args.slice(2).join(' ') || '🩸 Spam from Vampire MD!';

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ SPAM 〕━━━┈⊷
┃ Spam a user with messages.
┃ 
┃ Usage: ${prefix}spam <number> <count> <message>
┃ 
┃ Example: ${prefix}spam 27797352930 10 Hello!
┃ 
┃ ⚠️ Use with caution!
┃ 🧛 "The darkness floods."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (count > 50) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Max spam count is 50!
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ SPAMMING 〕━━━┈⊷
┃ 👤 Target: ${userJid}
┃ 📊 Count: ${count}
┃ 
┃ 🧛 "The darkness floods..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    for (let i = 0; i < count; i++) {
      try {
        await sock.sendMessage(userJid, {
          text: `${message} [${i + 1}/${count}]`
        });
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch {}
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ SPAM COMPLETE 〕━━━┈⊷
┃ 📤 ${count} messages sent to ${target}
┃ 
┃ 🧛 "The darkness has spoken."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
