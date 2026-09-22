import fs from 'fs';

export default {
  name: 'botmode',
  description: 'Switch bot mode (public / private / silent)',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = (args[0] || '').toLowerCase();
    if (!['public', 'private', 'silent'].includes(mode)) {
      return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}botmode <public|private|silent>` }, { quoted: msg });
    }
    fs.writeFileSync('./bot_mode.json', JSON.stringify({ mode }, null, 2));
    await sock.sendMessage(chatId, { text: `✅ Bot mode set to *${mode}*.` }, { quoted: msg });
  }
};
