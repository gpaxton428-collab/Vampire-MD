export default {
  name: 'ai2',
  description: 'AI Model 2 - GPT AI',
  category: 'ai',
  aliases: ['gpt', 'g'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🤖 AI 2 - GPT 〕━━━┈⊷
┃ Chat with GPT AI
┃ 
┃ Usage: ${prefix}ai2 <question>
┃ 
┃ Example: ${prefix}ai2 What is AI?
┃ 
┃ 🧛 "Access advanced GPT AI"
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
          text: `╭━━━〔 🤖 AI 2 - GPT 〕━━━┈⊷
┃ ${data.result}
┃ 
┃ 🧛 "Powered by GPT AI"
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else if (data.error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${data.error}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to get response from GPT AI.
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
