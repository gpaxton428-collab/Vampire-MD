export default {
  name: 'eval',
  description: 'Evaluate a JS expression (owner/dev only)',
  category: 'dev',
  alias: ['ev', '='],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const code = args.join(' ');
    if (!code) return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}eval <expression>` }, { quoted: msg });
    try {
      // eslint-disable-next-line no-eval
      let result = eval(code);
      if (result instanceof Promise) result = await result;
      const output = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
      await sock.sendMessage(chatId, { text: `✅ *Result:*\n\`\`\`${output}\`\`\`` }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(chatId, { text: `❌ *Error:*\n\`\`\`${e.message}\`\`\`` }, { quoted: msg });
    }
  }
};
