import fs from 'fs';

export default {
  name: 'unbanscript',
  description: 'Create an unbanning script for a user',
  category: 'dangerous',
  aliases: ['scriptunban', 'mkunban'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const target = args[0];

    if (!target) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📜 UNBAN SCRIPT 〕━━━┈⊷
┃ Create an unbanning script for a user.
┃ 
┃ Usage: ${prefix}unbanscript <number>
┃ 
┃ Example: ${prefix}unbanscript 27797352930
┃ 
┃ 🧛 "The darkness forgives your fate."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const userJid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    // Create unban script
    const script = `#!/bin/bash
# Unban Script for ${target}
# Created by Vampire MD

echo "✅ Unbanning ${target}..."
echo "📊 Sending unban requests..."

# Send unban requests
for i in {1..10}
do
  echo "📨 Sending unban request $i..."
  sleep 0.5
done

echo "✅ ${target} has been unbanned!"
echo "🩸 The darkness forgives you!"`;

    const scriptName = `unban_${target}_${Date.now()}.sh`;

    // Save script
    fs.writeFileSync(`./${scriptName}`, script);

    // Send script as file
    const scriptContent = fs.readFileSync(`./${scriptName}`);

    await sock.sendMessage(chatId, {
      document: scriptContent,
      fileName: scriptName,
      mimetype: 'text/plain',
      caption: `╭━━━〔 📜 UNBAN SCRIPT CREATED 〕━━━┈⊷
┃ 👤 Target: ${target}
┃ 📄 Script: ${scriptName}
┃ 
┃ 🧛 "The darkness has forgiven your fate."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    // Delete script after sending
    fs.unlinkSync(`./${scriptName}`);
  }
};
