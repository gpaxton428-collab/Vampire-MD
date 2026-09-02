export default {
  name: 'jokes',
  description: 'Get random jokes',
  category: 'fun',
  aliases: ['joke', 'funny'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    try {
      const response = await fetch(`https://apix.wolvarex.com/api/fun/jokes?key=wxa_d_test`);
      const data = await response.json();
      
      if (data.success && data.result) {
        await sock.sendMessage(chatId, { 
          text: `😂 *Joke*\n\n${data.result.text}\n\n> Powered by Apix` 
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, { 
          text: '❌ Failed to fetch a joke. Please try again.' 
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, { 
        text: `❌ Error: ${error.message}` 
      }, { quoted: msg });
    }
  }
};
