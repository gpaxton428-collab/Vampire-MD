import fs from 'fs';

export default {
  name: 'broadcast',
  description: 'Send a message to all groups and users',
  category: 'owner',
  aliases: ['bc', 'announce'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const message = args.join(' ');

    if (!message) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📢 BROADCAST 〕━━━┈⊷
┃ Send message to all groups and users.
┃ 
┃ Usage: ${prefix}broadcast <message>
┃ 
┃ Example: ${prefix}broadcast Bot will be down for maintenance
┃ 
┃ 🧛 "Speak to the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 📢 BROADCASTING 〕━━━┈⊷
┃ Sending message to all groups and users...
┃ 
┃ 🧛 "The darkness spreads."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      // Get all chats
      const chats = await sock.chats();
      let sent = 0;
      let failed = 0;

      for (const chat of chats) {
        try {
          const jid = chat.id;
          // Skip the current chat
          if (jid === chatId) continue;
          
          await sock.sendMessage(jid, {
            text: `╭━━━〔 📢 ANNOUNCEMENT 〕━━━┈⊷
┃ ${message}
┃ 
┃ 🧛 "From the master of darkness."
╰━━━━━━━━━━━━━━━┈⊷`
          });
          sent++;
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch {
          failed++;
        }
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ BROADCAST COMPLETE 〕━━━┈⊷
┃ 📤 Sent: ${sent} chats
┃ ❌ Failed: ${failed} chats
┃ 
┃ 🧛 "The darkness has spoken."
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
