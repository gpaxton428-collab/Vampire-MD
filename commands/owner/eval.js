export default {
  name: 'eval',
  description: 'Execute JavaScript code',
  category: 'owner',
  aliases: ['execute', 'run'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const code = args.join(' ');

    if (!code) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ⚡ EVAL 〕━━━┈⊷
┃ Usage: ${prefix}eval <code>
┃ 
┃ Example: ${prefix}eval 1 + 1
┃ 🧛 "Execute the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      let result = eval(code);
      if (typeof result !== 'string') result = JSON.stringify(result, null, 2);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ⚡ EVAL RESULT 〕━━━┈⊷
┃ 
┃ ${result}
┃ 
┃ 🧛 "The darkness executes."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
