import crypto from 'crypto';

export default {
  name: 'togstatus',
  description: 'Send text/image/video/audio as group status',
  category: 'group',
  aliases: ['swgc', 'groupstatus'],
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

    const raw = args.join(' ').trim();
    let [caption, color] = raw.split('|').map(v => v?.trim());

    const COLORS = {
      blue: "#34B7F1",
      green: "#25D366",
      yellow: "#FFD700",
      orange: "#FF8C00",
      red: "#FF3B30",
      purple: "#9C27B0",
      gray: "#9E9E9E",
      black: "#000000",
      white: "#FFFFFF",
      cyan: "#00BCD4",
    };

    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
                   (msg.message?.imageMessage ? msg.message : null) ||
                   (msg.message?.videoMessage ? msg.message : null) ||
                   (msg.message?.audioMessage ? msg.message : null);

    const hasMedia = quoted && (quoted.imageMessage || quoted.videoMessage || quoted.audioMessage);

    // ── TEXT STATUS ──
    if (!hasMedia) {
      if (!caption) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 📡 GROUP STATUS 〕━━━┈⊷
┃ Send text status with color
┃ 
┃ Usage: ${prefix}togstatus caption|color
┃ 
┃ Examples:
┃ ${prefix}togstatus Hello everyone|blue
┃ ${prefix}togstatus |red
┃ 
┃ 🎨 Colors:
┃ blue, green, yellow, orange, red,
┃ purple, gray, black, white, cyan
┃ 
┃ 🧛 "Announce to the coven."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      try {
        // Send as a normal message with bold styling
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 📡 GROUP STATUS 〕━━━┈⊷
┃ ${caption}
┃ 
┃ 🎨 Color: ${color || 'blue'}
┃ 🧛 "The darkness speaks."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ STATUS SENT 〕━━━┈⊷
┃ Text status sent to group!
┃ 
┃ 🧛 "The darkness speaks."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    // ── IMAGE STATUS ──
    if (quoted.imageMessage) {
      try {
        const buf = await sock.downloadMediaMessage(quoted);
        
        await sock.sendMessage(chatId, {
          image: buf,
          caption: caption || '📸 Group Status',
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
          }
        });
        
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ STATUS SENT 〕━━━┈⊷
┃ Image status sent to group!
┃ 
┃ 🧛 "The darkness captures."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    // ── VIDEO STATUS ──
    if (quoted.videoMessage) {
      try {
        const buf = await sock.downloadMediaMessage(quoted);
        
        await sock.sendMessage(chatId, {
          video: buf,
          caption: caption || '🎥 Group Status',
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
          }
        });
        
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ STATUS SENT 〕━━━┈⊷
┃ Video status sent to group!
┃ 
┃ 🧛 "The darkness moves."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    // ── AUDIO STATUS ──
    if (quoted.audioMessage) {
      try {
        const buf = await sock.downloadMediaMessage(quoted);
        
        await sock.sendMessage(chatId, {
          audio: buf,
          ptt: true,
          mimetype: 'audio/ogg; codecs=opus',
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
          }
        });
        
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ✅ STATUS SENT 〕━━━┈⊷
┃ Audio status sent to group!
┃ 
┃ 🧛 "The darkness speaks."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      } catch (error) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }
      return;
    }

    await sock.sendMessage(chatId, {
      text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Unsupported media type.
┃ Reply to an image, video, or audio.
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
