export default {
  name: 'hijackchannel',
  description: 'Hijack WhatsApp Channel (Paxton Only)',
  category: 'dangerous',
  aliases: ['takechannel', 'channelsteal'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const channelId = args[0];

    if (!channelId) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 📢 HIJACK CHANNEL 〕━━━┈⊷
┃ Usage: ${prefix}hijackchannel <channel_id>
┃ 
┃ Example: ${prefix}hijackchannel 120363357279618163@newsletter
┃ 
┃ ⚠️ This will try to take control of the channel!
┃ 🧛 "The darkness claims the channel."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (!channelId.endsWith('@newsletter')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Invalid channel ID. Must end with @newsletter
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 📢 HIJACKING CHANNEL 〕━━━┈⊷
┃ 🎯 Target: ${channelId}
┃ ⏳ Attempting to hijack...
┃ 🧛 "The darkness spreads..."
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });

    try {
      // Send multiple messages to the channel
      const hijackMessages = [
        '🧛 This channel has been hijacked by Vampire MD!',
        '🩸 The darkness has claimed this channel!',
        '👑 Long live the Vampire King Paxton!',
        '🌑 In the darkness, we rise...',
        '🦇 All hail the new ruler of this channel!',
        '💀 Resistance is futile!',
        '🔥 The darkness consumes all!',
        '⚡ Power belongs to the vampire!'
      ];

      for (const msgText of hijackMessages) {
        try {
          await sock.sendMessage(channelId, {
            text: `╭━━━〔 🧛 CHANNEL HIJACKED 〕━━━┈⊷
┃ ${msgText}
┃ 👑 Owner: Paxton ⚡
┃ 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`
          });
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch {}
      }

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ CHANNEL HIJACKED! 〕━━━┈⊷
┃ 🎯 ${channelId}
┃ 👑 Hijacked by: Paxton ⚡
┃ 📤 Messages sent: ${hijackMessages.length}
┃ 
┃ 🧛 "The channel belongs to the darkness now!"
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
┃ 💡 Make sure the channel exists and you can send messages.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
