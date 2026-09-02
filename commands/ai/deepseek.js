export default {
  name: 'deepseek',
  description: 'Chat with DeepSeek R1 (FREE)',
  category: 'ai',
  aliases: ['deep', 'coder'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(chatId, { 
        text: `❌ Please provide a question!\n\nExample: ${prefix}deepseek Write Python code` 
      }, { quoted: msg });
      return;
    }

    try {
      await sock.sendMessage(chatId, { text: '⏳ DeepSeek is thinking...' }, { quoted: msg });
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [{ role: 'user', content: query }],
          temperature: 0.7
        })
      });
      
      const data = await response.json();
      
      if (data.choices) {
        await sock.sendMessage(chatId, { 
          text: `💻 *DeepSeek R1*\n\n${data.choices[0].message.content}\n\n> Powered by OpenRouter` 
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, { 
          text: `❌ ${data.error?.message || 'Unknown error'}` 
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, { 
        text: `❌ Error: ${error.message}` 
      }, { quoted: msg });
    }
  }
};
