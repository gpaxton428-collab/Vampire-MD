export default {
  name: 'vv',
  description: 'Re-send a quoted view-once photo/video as a normal message',
  category: 'tools',
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted) {
      return sock.sendMessage(chatId, { text: `❌ Reply to a view-once photo/video with ${prefix}vv` }, { quoted: msg });
    }

    const vvMsg = quoted.viewOnceMessage?.message || quoted.viewOnceMessageV2?.message || quoted;
    const imageMsg = vvMsg.imageMessage;
    const videoMsg = vvMsg.videoMessage;

    if (!imageMsg && !videoMsg) {
      return sock.sendMessage(chatId, { text: '❌ The quoted message is not a view-once photo/video.' }, { quoted: msg });
    }

    try {
      const { downloadContentFromMessage } = await import('@whiskeysockets/baileys');
      const type = imageMsg ? 'image' : 'video';
      const stream = await downloadContentFromMessage(imageMsg || videoMsg, type);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

      const caption = (imageMsg || videoMsg).caption || '';
      await sock.sendMessage(chatId, type === 'image'
        ? { image: buffer, caption }
        : { video: buffer, caption }
      , { quoted: msg });
    } catch (e) {
      await sock.sendMessage(chatId, { text: `❌ Failed to reveal media: ${e.message}` }, { quoted: msg });
    }
  }
};
