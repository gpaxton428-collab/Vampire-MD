export default {
  name: 'broadcast',
  description: 'Broadcast a message to all known groups',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const text = args.join(' ');
    if (!text) return sock.sendMessage(chatId, { text: `❌ Usage: ${prefix}broadcast <message>` }, { quoted: msg });
    try {
      const groups = await sock.groupFetchAllParticipating();
      const ids = Object.keys(groups || {});
      let sent = 0;
      for (const id of ids) {
        try { await sock.sendMessage(id, { text: `📢 *Broadcast*\n\n${text}` }); sent++; } catch {}
      }
      await sock.sendMessage(chatId, { text: `✅ Broadcast sent to ${sent}/${ids.length} groups.` }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(chatId, { text: `❌ Broadcast failed: ${e.message}` }, { quoted: msg });
    }
  }
};
