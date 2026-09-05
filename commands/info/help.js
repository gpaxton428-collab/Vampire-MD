export default {
  name: 'help',
  description: 'Show all commands',
  category: 'info',
  aliases: ['menu'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, {
      text: `╭━━━〔 🌑 VAMPIRE MD V2.5.0 〕━━━┈⊷
┃ 👑 Owner: Paxton ⚡
┃ 📦 Commands: 20+
┃ 📊 Status: 🟢 ONLINE
╰━━━━━━━━━━━━━━━┈⊷

╭━━━〔 👑 OWNER 〕━━━┈⊷
┃ ✓ .settings
┃ ✓ .restart
┃ ✓ .shutdown
╰━━━━━━━━━━━━━━━┈⊷

╭━━━〔 📊 UTILITY 〕━━━┈⊷
┃ ✓ .ping
┃ ✓ .uptime
┃ ✓ .status
╰━━━━━━━━━━━━━━━┈⊷

╭━━━〔 🎮 FUN 〕━━━┈⊷
┃ ✓ .flirt
┃ ✓ .roast
┃ ✓ .8ball
╰━━━━━━━━━━━━━━━┈⊷

╭━━━〔 👥 GROUP 〕━━━┈⊷
┃ ✓ .groupinfo
┃ ✓ .tagall
╰━━━━━━━━━━━━━━━┈⊷

╭━━━〔 🛠️ TOOLS 〕━━━┈⊷
┃ ✓ .getpp
╰━━━━━━━━━━━━━━━┈⊷

> Powered by Paxton`
    }, { quoted: msg });
  }
};
