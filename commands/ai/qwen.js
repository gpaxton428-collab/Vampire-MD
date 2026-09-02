export default {
  name: 'qwen',
  description: 'Chat with Qwen 2.5 72B (FREE)',
  category: 'ai',
  aliases: ['qwen2'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(chatId, { 
        text: `❌ Please provide a question!\n\nExample: ${prefix}qwen What is AI?` 
      }, { quoted: msg });
      return;
    }

    try {
      await sock.sendMessage(chatId, { text: '⏳ Qwen is thinking...' }, { quoted: msg });
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'qwen/qwen-2.5-72b-instruct:free',
          messages: [{ role: 'user', content: query }],
          temperature: 0.7
        })
      });
      
      const data = await response.json();
      
      if (data.choices) {
        await sock.sendMessage(chatId, { 
          text: `🐉 *Qwen 2.5 72B*\n\n${data.choices[0].message.content}\n\n> Powered by OpenRouter` 
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
