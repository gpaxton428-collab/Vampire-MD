export default {
  name: 'groupspam',
  description: 'Spam a group with messages',
  category: 'dangerous',
  aliases: ['gspam', 'gflood'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const count = parseInt(args[0]) || 5;
    const message = args.slice(1).join(' ') || '🩸 Group Spam from Vampire MD!';

    if (!chatId.endsWith('@g.us')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (count > 30) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Max group spam count is 30!
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ GROUP SPAM 〕━━━┈⊷
┃ 📊 Count: ${count}
┃ 
┃ 🧛 "The darkness floods the coven..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    for (let i = 0; i < count; i++) {
      try {
        await sock.sendMessage(chatId, {
          text: `${message} [${i + 1}/${count}]`
        });
        await new Promise(resolve => setTimeout(resolve, 800));
      } catch {}
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ GROUP SPAM COMPLETE 〕━━━┈⊷
┃ 📤 ${count} messages sent
┃ 
┃ 🧛 "The darkness has flooded."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
