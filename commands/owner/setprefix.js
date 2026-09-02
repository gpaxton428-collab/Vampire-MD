import fs from 'fs';

export default {
  name: 'setprefix',
  description: 'Change the bot command prefix',
  category: 'owner',
  aliases: ['prefix', 'changeprefix'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const newPrefix = args[0];

    if (!newPrefix) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ⚙️ SET PREFIX 〕━━━┈⊷
┃ Current Prefix: ${prefix}
┃ 
┃ Usage: ${prefix}setprefix <newprefix>
┃ 
┃ Example: ${prefix}setprefix !
┃ Example: ${prefix}setprefix .
┃ 
┃ 🧛 "Change the summoning word."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (newPrefix.length > 5) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Prefix too long! Max 5 characters.
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
      const prefixIndex = lines.findIndex(line => line.startsWith('PREFIX='));
      
      if (prefixIndex >= 0) {
        lines[prefixIndex] = `PREFIX=${newPrefix}`;
      } else {
        lines.push(`PREFIX=${newPrefix}`);
      }
      
      fs.writeFileSync('.env', lines.join('\n'));
      
      // Also save to config file
      fs.writeFileSync('./prefix_config.json', JSON.stringify({ 
        prefix: newPrefix, 
        updatedAt: new Date().toISOString(),
        updatedBy: msg.key.participant || msg.key.remoteJid
      }, null, 2));

      // Update global prefix
      process.env.PREFIX = newPrefix;
      global.prefix = newPrefix;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ PREFIX UPDATED 〕━━━┈⊷
┃ New Prefix: ${newPrefix}
┃ 
┃ 🧛 "The summoning word has changed."
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
