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
      
      // Bot info
      const sessionExists = fs.existsSync('./session');
      const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
      const botName = process.env.BOT_NAME || 'Vampire MD';
      
      // Command count
      let commandCount = 0;
      try {
        const commandFiles = fs.readdirSync('./commands').filter(f => fs.statSync(`./commands/${f}`).isDirectory());
        commandFiles.forEach(dir => {
          const files = fs.readdirSync(`./commands/${dir}`).filter(f => f.endsWith('.js'));
          commandCount += files.length;
        });
      } catch {}

      const systemInfo = `┌─── 🧛 *VOID AI - VAMPIRE SYSTEM* ───┐
│
│ 👤 *User:* ${os.userInfo().username}
│ 🤖 *Bot:* ${botName}
│ 📦 *Commands:* ${commandCount}
│ 🔌 *Plugins:* ${packageJson.dependencies ? Object.keys(packageJson.dependencies).length : 0}
│
│ 💻 *CPU:*
│   ├─ Model: ${os.cpus()[0]?.model || 'Unknown'}
│   ├─ Cores: ${os.cpus().length}
│   └─ Load: ${cpuUsage.toFixed(2)}%
│
│ 🧠 *Memory:*
│   ├─ Total: ${totalMem.toFixed(2)} GB
│   ├─ Used: ${usedMem.toFixed(2)} GB
│   └─ Free: ${freeMem.toFixed(2)} GB
│
│ ⏱️ *Uptime:* ${uptimeHours}h ${uptimeMinutes}m
│ 📱 *Session:* ${sessionExists ? '✅ Active' : '❌ Not Found'}
│
├─── 💬 *Query:* ${query} ───┤`;

      // Generate AI response about system
      let aiResponse = '';
      if (query.toLowerCase() === 'status') {
        aiResponse = `🩸 *Void AI - System Status Report*\n\n${systemInfo}\n\n> 🧛 \"Your system is stable. The darkness serves you well.\"`;
      } else {
        try {
          const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || 'YOUR_API_KEY'}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'meta-llama/llama-3.3-70b-instruct:free',
              messages: [
                { role: 'system', content: `You are Void AI, a dark and mysterious vampire AI. You are wise, ancient, and speak with an elegant, dramatic tone. You analyze system data and respond with poetic wisdom. System info: ${JSON.stringify({cpu: cpuUsage, memory: usedMem, uptime: uptimeHours})}` },
                { role: 'user', content: query }
              ],
              temperature: 0.8
            })
          });
          const data = await response.json();
          if (data.choices) {
            aiResponse = `🧛 *Void AI - Vampire Intelligence*\n\n${data.choices[0].message.content}\n\n${systemInfo}\n\n> 🩸 \"In the darkness, we rise...\"`;
          }
        } catch (e) {
          aiResponse = `${systemInfo}\n\n> ❌ AI response unavailable. Your system stands strong alone.`;
        }
      }

      await sock.sendMessage(chatId, { 
        text: aiResponse || systemInfo
      }, { quoted: msg });
      
    } catch (error) {
      await sock.sendMessage(chatId, { 
        text: `❌ Void AI Error: ${error.message}` 
      }, { quoted: msg });
    }
  }
};
