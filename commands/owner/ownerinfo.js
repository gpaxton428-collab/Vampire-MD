import { getOwnerName, getRepo } from '../../lib/menuHelper.js';

export default {
  name: 'ownerinfo',
  description: 'Show owner and repository info',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg, args, prefix, ctx = {}) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 👑 OWNER INFO 〕━━━┈⊷
┃ Name: ${getOwnerName()}
┃ Number: ${ctx.OWNER_NUMBER || process.env.OWNER_NUMBER}
┃ Repo: ${getRepo()}
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
