export default {
  name: 'isaac',
  description: 'Isaac - Professional AI assistant',
  category: 'ai',
  aliases: ['assistant', 'helpai'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(chatId, { 
        text: `❌ Please provide a question!\n\nExample: ${prefix}isaac How can I improve my business?\n\n🤵 *Isaac* is a professional AI assistant specializing in:\n• Business & Finance\n• Technology & Coding\n• Education & Learning\n• Personal Development\n• Professional Advice` 
      }, { quoted: msg });
      return;
    }

    try {
      await sock.sendMessage(chatId, { text: '⏳ Isaac is analyzing...' }, { quoted: msg });
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || 'YOUR_API_KEY'}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',
          messages: [
            { role: 'system', content: `You are Isaac, a highly professional, intelligent, and articulate AI assistant. You provide clear, concise, and well-structured responses. You are knowledgeable in business, technology, education, and personal development. You speak with confidence and professionalism, always offering practical advice and solutions.` },
            { role: 'user', content: query }
          ],
          temperature: 0.6
        })
      });
      
      const data = await response.json();
      
      if (data.choices) {
        await sock.sendMessage(chatId, { 
          text: `🤵 *Isaac - Professional AI*\n\n${data.choices[0].message.content}\n\n> 🧛 \"Precision meets intelligence.\"` 
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, { 
          text: `❌ ${data.error?.message || 'Isaac is unavailable.'}` 
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, { 
        text: `❌ Error: ${error.message}` 
      }, { quoted: msg });
    }
  }
};
