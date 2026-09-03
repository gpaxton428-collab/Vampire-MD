import fs from 'fs';

export default {
  name: 'banscript',
  description: 'Create a banning script for a user',
  category: 'dangerous',
  aliases: ['scriptban', 'mkban'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📜 BAN SCRIPT 〕━━━┈⊷
┃ Create a banning script for a user.
┃ 
┃ Usage: ${prefix}banscript <number>
┃ 
┃ Example: ${prefix}banscript 27797352930
┃ 
┃ 🧛 "The darkness writes your fate."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    // Create ban script
    const script = `#!/bin/bash
# Ban Script for ${target}
# Created by Vampire MD

echo "🚫 Banning ${target}..."
echo "📊 Sending ban reports..."

# Send ban reports
for i in {1..10}
do
  echo "📨 Sending report $i..."
  sleep 0.5
done

echo "✅ ${target} has been banned!"
echo "🩸 The darkness wins!"`;

    const scriptName = `ban_${target}_${Date.now()}.sh`;

    // Save script
    fs.writeFileSync(`./${scriptName}`, script);

    // Send script as file
    const scriptContent = fs.readFileSync(`./${scriptName}`);

    await sock.sendMessage(chatId, {
      document: scriptContent,
      fileName: scriptName,
      mimetype: 'text/plain',
      caption: `╭━━━〔 📜 BAN SCRIPT CREATED 〕━━━┈⊷
┃ 👤 Target: ${target}
┃ 📄 Script: ${scriptName}
┃ 
┃ 🧛 "The darkness has written your fate."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    // Delete script after sending
    fs.unlinkSync(`./${scriptName}`);
  }
};
