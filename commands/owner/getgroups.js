export default {
  name: 'getgroups',
  description: 'Get list of all groups bot is in',
  category: 'owner',
  aliases: ['groups', 'grouplist'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    try {
      const chats = await sock.chats();
      const groups = [];

      for (const chat of chats) {
        if (chat.id.endsWith('@g.us')) {
          try {
            const metadata = await sock.groupMetadata(chat.id);
            groups.push({
              id: chat.id,
              name: metadata.subject || 'Unknown',
              members: metadata.participants?.length || 0
            });
          } catch {}
        }
      }

      if (groups.length === 0) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 📋 GROUPS 〕━━━┈⊷
┃ No groups found.
┃ 🧛 "The darkness is alone."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      let list = `╭━━━〔 📋 GROUPS 〕━━━┈⊷\n`;
      groups.slice(0, 30).forEach((group, index) => {
        list += `┃ ${index + 1}. ${group.name}\n`;
        list += `┃    👥 ${group.members} members\n`;
      });
      if (groups.length > 30) {
        list += `┃ ... and ${groups.length - 30} more\n`;
      }
      list += `┃ \n┃ 📊 Total: ${groups.length}\n`;
      list += `┃ 🧛 "The darkness spreads."
╰━━━━━━━━━━━━━━━┈⊷`;

      await sock.sendMessage(chatId, { text: list }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
