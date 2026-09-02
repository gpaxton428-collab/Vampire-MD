import fs from 'fs';
import path from 'path';

export default {
  name: 'setprefix',
  description: 'View or change the bot command prefix',
  category: 'owner',
  aliases: ['prefix', 'changeprefix'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const newPrefix = args.join(' ').trim();
    const current = process.env.PREFIX || '.';

    // Show current prefix when no args
    if (!args.length) {
      const display = current === '' || current.toLowerCase() === 'none' 
        ? '_none (no prefix)_' 
        : current.toLowerCase() === 'any' 
          ? '_any symbol_' 
          : `\`${current}\``;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ⚙️ PREFIX 〕━━━┈⊷
┃ Current Prefix: ${display}
┃ 
┃ How to change:
┃ ${prefix}setprefix .  - Single prefix
┃ ${prefix}setprefix .,!,/  - Multiple prefixes
┃ ${prefix}setprefix any  - Any symbol works
┃ ${prefix}setprefix none  - No prefix (bare commands)
┃ ${prefix}setprefix 🤖  - Emoji prefix
┃ 
┃ 🧛 "Change the summoning word."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (!newPrefix) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Prefix cannot be empty. Use "none" to disable.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    if (newPrefix.length > 50) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Prefix too long (max 50 characters).
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    // Update .env file
    let envContent = '';
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    const lines = envContent.split('\n');
    const prefixIndex = lines.findIndex(line => line.startsWith('PREFIX='));
    
    if (prefixIndex >= 0) {
      lines[prefixIndex] = `PREFIX=${newPrefix}`;
    } else {
      lines.push(`PREFIX=${newPrefix}`);
    }
    
    fs.writeFileSync(envPath, lines.join('\n'));

    // Update memory
    process.env.PREFIX = newPrefix;
    global.prefix = newPrefix;

    const isNone = newPrefix.toLowerCase() === 'none' || newPrefix === '';
    const isAny = newPrefix.toLowerCase() === 'any';
    const list = !isNone && !isAny ? newPrefix.split(',').map(p => p.trim()).filter(Boolean) : [];

    let summary = '';
    if (isNone) summary = '✅ Prefix disabled. Commands work without any prefix.';
    else if (isAny) summary = '✅ Any-prefix mode. Any symbol or emoji triggers commands.';
    else if (list.length > 1) summary = `✅ Multi-prefix set: ${list.map(p => `\`${p}\``).join('  ')}`;
    else summary = `✅ Prefix set to: \`${newPrefix}\``;

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ✅ PREFIX UPDATED 〕━━━┈⊷
┃ ${summary}
┃ 
┃ Change takes effect immediately.
┃ 
┃ 🧛 "The summoning word has changed."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
