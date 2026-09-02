export default {
  name: 'groq',
  description: 'Chat with Groq AI',
  category: 'ai',
  aliases: ['groqai'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(chatId, { 
        text: `❌ Please provide a question!\n\nExample: ${prefix}groq What is the meaning of life?` 
      }, { quoted: msg });
      return;
    }

    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(`https://apix.wolvarex.com/api/ai/groq?q=${encodedQuery}&key=wxa_d_test`);
      const data = await response.json();
      
      if (data.status && data.result) {
        await sock.sendMessage(chatId, { 
          text: `⚡ *Groq AI*\n\n${data.result}\n\n> Powered by Apix` 
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, { 
          text: '❌ Failed to get response from Groq AI. Please try again.' 
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, { 
        text: `❌ Error: ${error.message}` 
      }, { quoted: msg });
    }
  }
};
