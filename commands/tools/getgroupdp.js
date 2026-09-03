export default {
  name: 'getgroupdp',
  description: 'Get group profile picture',
  category: 'tools',
  aliases: ['gpp', 'gdpp'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    
    if (!chatId.endsWith('@g.us')) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command can only be used in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    try {
      const pp = await sock.profilePictureUrl(chatId, 'image');
      
      await sock.sendMessage(chatId, {
        image: { url: pp },
        caption: `╭━━━〔 🖼️ GROUP DP 〕━━━┈⊷
┃ 📌 Group: ${chatId}
┃ 
┃ 🧛 "The coven's banner."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      if (error.message.includes('404')) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ No group profile picture found.
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
    }
  }
};
