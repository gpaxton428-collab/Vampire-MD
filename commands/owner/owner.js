import fs from 'fs';

export default {
  name: 'owner',
  description: 'Show owner information and contact',
  category: 'owner',
  aliases: ['ownerinfo', 'creator', 'dev'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    // Load owner data from owner.json
    let ownerName = 'Paxton';
    let ownerNumber = 'Not set';
    let ownerJid = 'Not set';
    let ownerTitle = 'Vampire King 👑';
    let ownerQuote = '"In the darkness, we rise..."';
    
    if (fs.existsSync('./owner.json')) {
      try {
        const data = JSON.parse(fs.readFileSync('./owner.json', 'utf8'));
        ownerName = data.OWNER_NAME || data.ownerName || 'Paxton';
        ownerNumber = data.OWNER_NUMBER || data.OWNER_CLEAN_NUMBER || data.ownerNumber || 'Not set';
        ownerJid = data.OWNER_JID || data.OWNER_CLEAN_JID || data.ownerJid || 'Not set';
        ownerTitle = data.OWNER_TITLE || data.ownerTitle || 'Vampire King 👑';
        ownerQuote = data.OWNER_QUOTE || data.ownerQuote || '"In the darkness, we rise..."';
      } catch {}
    }

    // Check environment variable
    const envOwner = process.env.OWNER_NUMBER || '';
    if (envOwner && ownerNumber === 'Not set') {
      ownerNumber = envOwner;
    }

    // Format the number
    const formattedNumber = ownerNumber !== 'Not set' ? `+${ownerNumber}` : 'Not set';

    // Get bot stats
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    let commandCount = 0;
    try {
      const commandFiles = fs.readdirSync('./commands').filter(f => fs.statSync(`./commands/${f}`).isDirectory());
      commandFiles.forEach(dir => {
        const files = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith('.js'));
        commandCount += files.length;
      });
    } catch {}

    const botName = process.env.BOT_NAME || 'Vampire MD';
    const version = process.env.VERSION || '2.5.0';

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 👑 OWNER INFO 〕━━━┈⊷
┃ 
┃ 👤 *Name:* ${ownerName}
┃ 📱 *Number:* ${formattedNumber}
┃ 🆔 *JID:* ${ownerJid}
┃ 👑 *Title:* ${ownerTitle}
┃ 
┃ 📌 *${ownerQuote}*
┃ 
┃ ─── 🤖 *BOT INFO* ───
┃ 🤖 *Bot:* ${botName}
┃ 📦 *Version:* ${version}
┃ 📊 *Commands:* ${commandCount}
┃ ⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s
┃ 
┃ 🧛 "The darkness has a master."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
