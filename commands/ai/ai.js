export default {
  name: 'ai',
  description: 'Chat with AI (Llama 3.3 70B)',
  category: 'ai',
  aliases: ['ask', 'chat'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(chatId, { 
        text: `❌ Please provide a question!\n\nAvailable models:\n${prefix}ai <question> - Llama 3.3 (Best)\n${prefix}gemini <question> - Gemini 2.0\n${prefix}claude <question> - Claude 3.5\n${prefix}mistral <question> - Mistral Large\n${prefix}llama <question> - Llama 3.3\n${prefix}deepseek <question> - DeepSeek R1\n${prefix}qwen <question> - Qwen 2.5\n\nExample: ${prefix}ai What is the meaning of life?` 
      }, { quoted: msg });
      return;
    }

    try {
      await sock.sendMessage(chatId, { text: '⏳ Thinking...' }, { quoted: msg });
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/gpaxton428-collab/Vampire-MD',
          'X-Title': 'Vampire MD'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct:free',
          messages: [{ role: 'user', content: query }],
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        await sock.sendMessage(chatId, { 
          text: `🤖 *Llama 3.3 70B*\n\n${data.choices[0].message.content}\n\n> Powered by OpenRouter` 
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
