import { getBotName, getOwnerName, getBotFooter, getRepo } from '../../lib/menuHelper.js';

export default {
  name: 'settings',
  description: 'View current bot settings',
  category: 'owner',
  alias: ['config', 'botsettings'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix, ctx = {}) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ⚙️ BOT SETTINGS 〕━━━┈⊷
┃ 🤖 Bot: ${getBotName()}
┃ 🔤 Prefix: ${prefix}
┃ 👑 Owner: ${getOwnerName()} (${ctx.OWNER_NUMBER || process.env.OWNER_NUMBER})
┃ 🔗 Repo: ${getRepo()}
┃ 📦 Version: ${ctx.VERSION || 'V3.0.0'}
┃ 🧛 Prefixless: ${ctx.isPrefixless ? 'on' : 'off'}
╰━━━━━━━━━━━━━━━┈⊷
${getBotFooter()}`
    }, { quoted: msg });
  }
};
