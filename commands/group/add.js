export default {
  name: 'add',
  description: 'Add a member to the group',
  category: 'group',
  aliases: ['invite', 'inviteuser'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const number = args[0];

    if (!number) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 👥 ADD MEMBER 〕━━━┈⊷
┃ Usage: ${prefix}add <number>
┃ 
┃ Example: ${prefix}add 27797352930
┃ 
┃ 📌 Number must include country code
┃ 📌 No spaces or special characters
┃ 
┃ 🧛 "Welcome to the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    // Clean the number
    const cleanNumber = number.replace(/[^0-9]/g, '');
    
    if (cleanNumber.length < 10) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Invalid number! Must be 10-15 digits.
┃ 
┃ Example: 27797352930
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const userJid = `${cleanNumber}@s.whatsapp.net`;

    try {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ⏳ ADDING MEMBER 〕━━━┈⊷
┃ 👤 +${cleanNumber}
┃ ⏳ Adding to group...
┃ 🧛 "The darkness calls..."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });

      // Try to add with timeout
      const addPromise = sock.groupParticipantsUpdate(chatId, [userJid], 'add');
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 15000)
      );

      await Promise.race([addPromise, timeoutPromise]);

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ADDED 〕━━━┈⊷
┃ 👤 +${cleanNumber}
┃ ✅ Successfully added to the group!
┃ 🧛 "A new vampire joins the coven."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      let errorMsg = error.message || 'Unknown error';
      
      if (errorMsg.includes('Timeout')) {
        errorMsg = 'Timed Out - User may not exist or has privacy settings enabled.';
      } else if (errorMsg.includes('403')) {
        errorMsg = 'Permission denied - Make sure I am an admin!';
      } else if (errorMsg.includes('404')) {
        errorMsg = 'User not found - The number may not be registered on WhatsApp.';
      } else if (errorMsg.includes('409')) {
        errorMsg = 'User is already in the group!';
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${errorMsg}
┃ 
┃ 💡 Make sure:
┃ • I am an admin
┃ • The number is valid
┃ • The user has WhatsApp
┃ 
┃ 🧛 "The darkness cannot reach."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
