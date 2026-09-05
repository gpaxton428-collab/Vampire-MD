export default {
  name: 'revoke',
  description: 'Revoke group invite link',
  category: 'group',
  aliases: ['revokelink', 'resetlink'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    try {
      const code = await sock.groupInviteCode(chatId);
      await sock.groupRevokeInvite(chatId);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ LINK REVOKED 〕━━━┈⊷
┃ Old link revoked.
┃ 🧛 "The coven is sealed."
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
