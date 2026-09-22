export default {
  name: 'vv2',
  description: 'Re-send a quoted view-once media privately to your own DM',
  category: 'tools',
  async execute(sock, msg, args, prefix, ctx = {}) {
    const chatId = msg.key.remoteJid;
    const senderJid = msg.key.participant || msg.key.remoteJid;
    const ownerJid = ctx.OWNER_JID || `${process.env.OWNER_NUMBER}@s.whatsapp.net`;

    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted) {
      return sock.sendMessage(chatId, { text: `❌ Reply to a view-once photo/video with ${prefix}vv2` }, { quoted: msg });
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
      // Send to the bot's own DM (owner) rather than back into the chat.
      const target = (ctx.isOwner && ctx.isOwner()) ? senderJid : ownerJid;
      await sock.sendMessage(target, type === 'image'
        ? { image: buffer, caption: `${caption}\n\n(from ${chatId})` }
        : { video: buffer, caption: `${caption}\n\n(from ${chatId})` }
      );
      await sock.sendMessage(chatId, { text: '✅ Sent to your DM.' }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(chatId, { text: `❌ Failed to reveal media: ${e.message}` }, { quoted: msg });
    }
  }
};
