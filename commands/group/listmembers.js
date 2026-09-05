export default {
  name: 'listmembers',
  description: 'List all group members',
  category: 'group',
  aliases: ['members', 'memberlist'],
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
      const metadata = await sock.groupMetadata(chatId);
      const members = metadata.participants;

      let list = `╭━━━〔 👥 MEMBERS 〕━━━┈⊷\n`;
      members.slice(0, 30).forEach((member, index) => {
        const num = member.id.split('@')[0];
        const role = member.admin ? '👑' : '👤';
        list += `┃ ${index + 1}. ${role} +${num}\n`;
      });
      if (members.length > 30) {
        list += `┃ ... and ${members.length - 30} more\n`;
      }
      list += `┃ \n┃ 📊 Total: ${members.length}\n`;
      list += `┃ 🧛 "The coven stands united."
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
