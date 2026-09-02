import fs from 'fs';

export default {
  name: 'setbotname',
  description: 'Change the bot name',
  category: 'owner',
  aliases: ['botname', 'name'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const newName = args.join(' ');

    if (!newName) {
      const currentName = process.env.BOT_NAME || 'Vampire MD';
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📛 SET BOT NAME 〕━━━┈⊷
┃ Current Name: ${currentName}
┃ 
┃ Usage: ${prefix}setbotname <new name>
┃ 
┃ Example: ${prefix}setbotname My Vampire Bot
┃ 
┃ 🧛 "Rename the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (newName.length > 50) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Name too long! Max 50 characters.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      // Save to .env
      let envContent = '';
      if (fs.existsSync('.env')) {
        envContent = fs.readFileSync('.env', 'utf8');
      }
      
      const lines = envContent.split('\n');
      const nameIndex = lines.findIndex(line => line.startsWith('BOT_NAME='));
      
      if (nameIndex >= 0) {
        lines[nameIndex] = `BOT_NAME=${newName}`;
      } else {
        lines.push(`BOT_NAME=${newName}`);
      }
      
      fs.writeFileSync('.env', lines.join('\n'));
      
      // Update global
      process.env.BOT_NAME = newName;
      global.BOT_NAME = newName;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ BOT NAME UPDATED 〕━━━┈⊷
┃ New Name: ${newName}
┃ 
┃ 🧛 "The darkness has a new name."
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
