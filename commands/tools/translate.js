export default {
  name: 'translate',
  description: 'Translate text to another language',
  category: 'tools',
  aliases: ['tr'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    if (args.length < 2) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🌍 TRANSLATE 〕━━━┈⊷
┃ Translate text to another language
┃ 
┃ Usage: ${prefix}translate <lang> <text>
┃ 
┃ Examples:
┃ ${prefix}translate fr Hello world
┃ ${prefix}translate sw Good morning
┃ 
┃ 🌍 Codes: fr, es, de, ar, sw, zh, ja, pt, hi, ru
┃ 
┃ 🧛 "Bridge the language barrier."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const targetLang = args[0].toLowerCase();
    const text = args.slice(1).join(' ');

    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
      const data = await response.json();

      if (data.responseData?.translatedText && data.responseStatus === 200) {
        const translated = data.responseData.translatedText;
        
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 🌍 TRANSLATION 〕━━━┈⊷
┃ 📝 *Original (en):*
┃ ${text}
┃ 
┃ ✅ *Translated (${targetLang.toUpperCase()}):*
┃ ${translated}
┃ 
┃ 🧛 "Language is no barrier."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Translation failed. Check language code.
┃ 
┃ Codes: fr, es, de, ar, sw, zh, ja, pt, hi, ru
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
