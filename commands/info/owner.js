import fs from 'fs';

export default {
  name: 'owner',
  description: 'Get owner contact as vCard',
  category: 'info',
  aliases: ['creator', 'dev'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    let ownerName = 'Paxton';
    let ownerNumber = '27797352930';
    let coOwnerName = 'SavageMulla';
    let coOwnerNumber = '263713941700';

    if (fs.existsSync('./owner.json')) {
      try {
        const data = JSON.parse(fs.readFileSync('./owner.json', 'utf8'));
        ownerName = data.OWNER_NAME || data.ownerName || 'Paxton';
        ownerNumber = data.OWNER_NUMBER || data.OWNER_CLEAN_NUMBER || data.ownerNumber || '27797352930';
        coOwnerName = data.CO_OWNER_NAME || data.coOwnerName || 'SavageMulla';
        coOwnerNumber = data.CO_OWNER_NUMBER || data.CO_OWNER_CLEAN_NUMBER || data.coOwnerNumber || '263713941700';
      } catch {}
    }

    try {
      // Send owner as contact card (vCard)
      const ownerVCard = `BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;type=CELL:+${ownerNumber}
END:VCARD`;

      await sock.sendMessage(chatId, {
        contacts: {
          displayName: `${ownerName}`,
          contacts: [{
            displayName: `${ownerName}`,
            vcard: ownerVCard
          }]
        }
      });

      // Send co-owner as contact card (vCard)
      const coOwnerVCard = `BEGIN:VCARD
VERSION:3.0
FN:${coOwnerName}
TEL;type=CELL:+${coOwnerNumber}
END:VCARD`;

      await sock.sendMessage(chatId, {
        contacts: {
          displayName: `${coOwnerName}`,
          contacts: [{
            displayName: `${coOwnerName}`,
            vcard: coOwnerVCard
          }]
        }
      });

    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};
