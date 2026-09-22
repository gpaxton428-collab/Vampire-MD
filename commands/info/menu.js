import { sendList, listSection } from '../../lib/buttons.js';
import { getBotName, getOwnerName, getBotFooter, getRepo } from '../../lib/menuHelper.js';

export default {
  name: 'menu',
  description: 'Show the interactive command menu',
  category: 'info',
  alias: ['help', 'commands'],
  async execute(sock, msg, args, prefix, ctx = {}) {
    const chatId = msg.key.remoteJid;
    const botName = ctx.BOT_NAME || getBotName();
    const owner = getOwnerName();
    const commands = ctx.commands;
    const commandCategories = ctx.commandCategories;

    const categoryEmoji = {
      owner: '👑',
      dev: '🧑‍💻',
      settings: '⚙️',
      info: 'ℹ️'
    };

    const sections = [];
    if (commandCategories && commandCategories.size) {
      for (const [category, names] of commandCategories.entries()) {
        if (!names.length) continue;
        sections.push(
          listSection(
            `${categoryEmoji[category] || '📂'} ${category.toUpperCase()}`,
            names.map(n => ({
              title: `${prefix}${n}`,
              id: `${prefix}${n}`,
              description: `Run the ${n} command`
            }))
          )
        );
      }
    }

    await sendList(sock, chatId, {
      text: `🧛 Welcome to *${botName}*\n👑 Owner: ${owner}\n📦 Total commands: ${commands ? commands.size : 0}\n🔗 Repo: ${getRepo()}\n\nTap *Browse Menu* below to pick a command.`,
      title: `${botName} — Command Center`,
      buttonText: '📂 Browse Menu',
      footer: getBotFooter(),
      sections
    }, { quoted: msg });
  }
};
