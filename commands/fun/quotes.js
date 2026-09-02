export default {
  name: 'quotes',
  description: 'Get inspirational quotes',
  category: 'fun',
  aliases: ['quote', 'inspire'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    try {
      const response = await fetch(`https://apix.wolvarex.com/api/fun/quotes?key=wxa_d_test`);
      const data = await response.json();
      
      if (data.success && data.result) {
        await sock.sendMessage(chatId, { 
          text: `💬 *Quote*\n\n"${data.result.text}"\n\n— ${data.result.category || 'Unknown'}\n\n> Powered by Apix` 
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, { 
          text: '❌ Failed to fetch a quote. Please try again.' 
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, { 
        text: `❌ Error: ${error.message}` 
      }, { quoted: msg });
    }
  }
};
