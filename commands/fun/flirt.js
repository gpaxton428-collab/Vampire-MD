export default {
  name: 'flirt',
  description: 'Get a random flirt line',
  category: 'fun',
  aliases: ['flirty', 'pickup'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    try {
      const response = await fetch(`https://apix.wolvarex.com/api/fun/flirt?key=wxa_d_test`);
      const data = await response.json();

      if (data.success && data.result) {
        await sock.sendMessage(chatId, {
          text: `😉 *Flirt Line*\n\n"${data.result.text}"\n\n💕 Category: ${data.result.category || 'flirt'}\n\n> Powered by Apix`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: '❌ Failed to fetch a flirt line. Please try again.'
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `❌ Error: ${error.message}`
      }, { quoted: msg });
    }
  }
};
