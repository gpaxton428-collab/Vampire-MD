export default {
  name: 'ai1',
  description: 'AI Model 1 - Keith AI',
  category: 'ai',
  aliases: ['keith', 'k'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🤖 AI 1 - KEITH 〕━━━┈⊷
┃ Chat with Keith AI
┃ 
┃ Usage: ${prefix}ai1 <question>
┃ 
┃ Example: ${prefix}ai1 What is AI?
┃ 
┃ 🧛 "Access advanced Keith AI"
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      await sock.sendMessage(chatId, { text: '⏳ Keith is thinking...' }, { quoted: msg });
      
      const response = await fetch(`https://apix.wolvarex.com/keithai?q=${encodeURIComponent(query)}&key=wxa_d_test`);
      const data = await response.json();
      
      if (data.result) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 🤖 AI 1 - KEITH 〕━━━┈⊷
┃ ${data.result}
┃ 
┃ 🧛 "Powered by Keith AI"
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else if (data.error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${data.error}
┃ 
┃ 💡 Try: ${prefix}ai2 for GPT AI
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to get response from Keith AI.
┃ Try using ${prefix}ai2 for GPT AI
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
┃ 
┃ 💡 Try: ${prefix}ai2 for GPT AI
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
