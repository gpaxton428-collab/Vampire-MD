export default {
  name: 'keith',
  description: 'Chat with Keith AI',
  category: 'ai',
  aliases: ['keithai'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🤖 KEITH AI 〕━━━┈⊷
┃ Chat with Keith AI
┃ 
┃ Usage: ${prefix}keith <question>
┃ 
┃ Example: ${prefix}keith What is AI?
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
          text: `╭━━━〔 🤖 KEITH AI 〕━━━┈⊷
┃ ${data.result}
┃ 
┃ 🧛 "Powered by Keith AI"
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
