import os from 'os';
import fs from 'fs';

export default {
  name: 'void',
  description: 'Void AI - Vampire system intelligence',
  category: 'ai',
  aliases: ['vampire', 'system'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const query = args.join(' ') || 'status';

    try {
      // System info
      const cpuUsage = os.loadavg()[0];
      const totalMem = os.totalmem() / 1024 / 1024 / 1024;
      const freeMem = os.freemem() / 1024 / 1024 / 1024;
      const usedMem = totalMem - freeMem;
      const uptime = os.uptime();
      const uptimeHours = Math.floor(uptime / 3600);
      const uptimeMinutes = Math.floor((uptime % 3600) / 60);
      
      const sessionExists = fs.existsSync('./session');
      const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
      const botName = process.env.BOT_NAME || 'Vampire MD';
      
      let commandCount = 0;
      try {
        const commandFiles = fs.readdirSync('./commands').filter(f => fs.statSync(`./commands/${f}`).isDirectory());
        commandFiles.forEach(dir => {
          const files = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith('.js'));
          commandCount += files.length;
        });
      } catch {}

      const systemInfo = `╭━━━〔 🧛 VOID AI 〕━━━┈⊷
┃ 👤 User: ${os.userInfo().username}
┃ 🤖 Bot: ${botName}
┃ 📦 Commands: ${commandCount}
┃ 🔌 Plugins: ${packageJson.dependencies ? Object.keys(packageJson.dependencies).length : 0}
┃
┃ 💻 CPU:
┃   ├─ Model: ${os.cpus()[0]?.model || 'Unknown'}
┃   ├─ Cores: ${os.cpus().length}
┃   └─ Load: ${cpuUsage.toFixed(2)}%
┃
┃ 🧠 Memory:
┃   ├─ Total: ${totalMem.toFixed(2)} GB
┃   ├─ Used: ${usedMem.toFixed(2)} GB
┃   └─ Free: ${freeMem.toFixed(2)} GB
┃
┃ ⏱️ Uptime: ${uptimeHours}h ${uptimeMinutes}m
┃ 📱 Session: ${sessionExists ? '✅ Active' : '❌ Not Found'}
╰━━━━━━━━━━━━━━━┈⊷`;

      let aiResponse = '';

      // If just "hi" or "status", show system info
      if (query.toLowerCase() === 'hi' || query.toLowerCase() === 'status' || query.toLowerCase() === 'hello') {
        aiResponse = `╭━━━〔 🧛 VOID AI 〕━━━┈⊷
┃ 🩸 *Void AI - Vampire Intelligence*
┃ 
┃ "The darkness speaks through me..."
┃ 
${systemInfo}
┃ 
┃ > 🧛 "Your system is stable. The darkness serves you well."
╰━━━━━━━━━━━━━━━┈⊷`;
      } else {
        try {
          const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'meta-llama/llama-3.3-70b-instruct:free',
              messages: [
                { 
                  role: 'system', 
                  content: `You are Void AI, a dark and mysterious vampire AI. You are wise, ancient, and speak with an elegant, dramatic tone. You are the guardian of the Vampire MD bot. Respond with poetic, dark wisdom. Keep responses concise and powerful.` 
                },
                { role: 'user', content: query }
              ],
              temperature: 0.8,
              max_tokens: 300
            })
          });
          
          const data = await response.json();
          
          if (data.choices && data.choices[0]) {
            aiResponse = `╭━━━〔 🧛 VOID AI 〕━━━┈⊷
┃ 🩸 *Void AI - Vampire Intelligence*
┃ 
┃ ${data.choices[0].message.content}
┃ 
${systemInfo}
┃ 
┃ > 🧛 "In the darkness, we rise..."
╰━━━━━━━━━━━━━━━┈⊷`;
          } else {
            aiResponse = `${systemInfo}`;
          }
        } catch (e) {
          aiResponse = `╭━━━〔 🧛 VOID AI 〕━━━┈⊷
┃ 🩸 *Void AI - System Report*
┃ 
┃ ❌ AI response unavailable.
┃ Your system stands strong alone.
┃ 
${systemInfo}
┃ 
┃ > 🧛 "The silence is also a form of wisdom."
╰━━━━━━━━━━━━━━━┈⊷`;
        }
      }

      await sock.sendMessage(chatId, { 
        text: aiResponse
      }, { quoted: msg });
      
    } catch (error) {
      await sock.sendMessage(chatId, { 
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷\n┃ Void AI Error: ${error.message}\n╰━━━━━━━━━━━━━━━┈⊷` 
      }, { quoted: msg });
    }
  }
};
