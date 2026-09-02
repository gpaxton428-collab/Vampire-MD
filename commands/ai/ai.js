export default {
  name: 'ai',
  description: 'Chat with AI using OpenRouter (supports 6 models)',
  category: 'ai',
  aliases: ['ask', 'chat'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(chatId, { 
        text: `❌ Please provide a question!\n\nAvailable models:\n${prefix}ai <question> - Default model\n${prefix}llama <question>\n${prefix}gemini <question>\n${prefix}claude <question>\n${prefix}mistral <question>\n${prefix}deepseek <question>\n\nExample: ${prefix}ai What is the meaning of life?` 
      }, { quoted: msg });
      return;
    }

    try {
      await sock.sendMessage(chatId, { text: '⏳ Thinking...' }, { quoted: msg });
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || 'YOUR_API_KEY'}`,
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
        const reply = data.choices[0].message.content;
        await sock.sendMessage(chatId, { 
          text: `🤖 *AI Response*\n\n${reply}\n\n> Powered by OpenRouter` 
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, { 
          text: `❌ Error: ${data.error?.message || 'Unknown error'}` 
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, { 
        text: `❌ Error: ${error.message}` 
      }, { quoted: msg });
    }
  }
};
