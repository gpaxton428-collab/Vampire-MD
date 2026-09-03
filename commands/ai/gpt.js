export default {
  name: 'gpt',
  description: 'Chat with GPT AI',
  category: 'ai',
  aliases: ['gptai', 'chatgpt'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🤖 GPT AI 〕━━━┈⊷
┃ Usage: ${prefix}gpt <question>
┃ 
┃ Example: ${prefix}gpt What is AI?
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      await sock.sendMessage(chatId, { text: '⏳ GPT is thinking...' }, { quoted: msg });
      
      const response = await fetch(`https://apix.wolvarex.com/ai/gpt?q=${encodeURIComponent(query)}&key=wxa_d_test`);
      const data = await response.json();
      
      if (data.result) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 🤖 GPT AI 〕━━━┈⊷
┃ ${data.result}
┃ 
┃ 🧛 "Powered by GPT AI"
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${data.error || 'Failed to get response'}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
