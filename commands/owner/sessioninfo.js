import fs from 'fs';

export default {
  name: 'sessioninfo',
  description: 'Show session information',
  category: 'owner',
  aliases: ['session', 'sess'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    try {
      if (!fs.existsSync('./session/creds.json')) {
        return sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ No session found!
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
      }

      const data = JSON.parse(fs.readFileSync('./session/creds.json', 'utf8'));
      const me = data.me || {};
      const registered = data.registered || false;

      await sock.sendMessage(chatId, {
        text: `╭━━━〔 🔑 SESSION INFO 〕━━━┈⊷
┃ 📱 Number: ${me.id ? me.id.split(':')[0] : 'Unknown'}
┃ 👤 Name: ${me.name || 'Unknown'}
┃ 🔐 Registered: ${registered ? '✅' : '❌'}
┃ 🧛 "The darkness knows you."
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
