export default {
  name: 'massban',
  description: 'Ban multiple users at once',
  category: 'dangerous',
  aliases: ['banall', 'multiban'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (args.length === 0) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🚫 MASS BAN 〕━━━┈⊷
┃ Ban multiple users at once.
┃ 
┃ Usage: ${prefix}massban <number1> <number2> ...
┃ 
┃ Example: ${prefix}massban 27797352930 27797352931 27797352932
┃ 
┃ 🧛 "The darkness banishes many."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🚫 MASS BAN STARTED 〕━━━┈⊷
┃ 📊 Targets: ${args.length}
┃ 
┃ 🧛 "The darkness banishes many..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    let banned = 0;
    let failed = 0;

    for (const target of args) {
      try {
        const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
        await sock.updateBlockStatus(userJid, 'block');
        await sock.sendMessage(userJid, {
          text: '🚫 You have been banned!'
        });
        banned++;
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch {
        failed++;
      }
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ MASS BAN COMPLETE 〕━━━┈⊷
┃ ✅ Banned: ${banned}
┃ ❌ Failed: ${failed}
┃ 
┃ 🧛 "The darkness has banished many."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
