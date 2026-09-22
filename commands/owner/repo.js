import { getRepo } from '../../lib/menuHelper.js';

export default {
  name: 'repo',
  description: 'Get the bot source code repository link',
  category: 'owner',
  alias: ['sc', 'sourcecode'],
  async execute(sock, msg) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { text: `🔗 Source code: ${getRepo()}` }, { quoted: msg });
  }
};
