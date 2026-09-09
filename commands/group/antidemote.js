import fs from 'fs';

export default {
  name: 'antidemote',
  description: 'Prevent admins from being demoted - with kick option',
  category: 'group',
  aliases: ['antidem', 'ad'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;

    if (!chatId.endsWith('@g.us')) {
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ This command only works in groups.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    const sub = args[0]?.toLowerCase();

    const configFile = './antidemote.json';
    let config = {};
    if (fs.existsSync(configFile)) {
      try {
        config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      } catch {}
    }

    if (!config[chatId]) config[chatId] = { 
      enabled: false, 
      action: 'warn', // warn, kick, ban
      warnings: {}
    };

    if (!sub || !['on', 'off', 'status', 'kick', 'warn', 'ban', 'reset'].includes(sub)) {
      const status = config[chatId].enabled ? '🟢 ENABLED' : '🔴 DISABLED';
      const action = config[chatId].action || 'warn';
      const actionEmoji = action === 'kick' ? '🦶' : action === 'ban' ? '🚫' : '⚠️';
      
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-DEMOTE STATUS 〕━━━┈⊷
┃ Status: ${status}
┃ Action: ${actionEmoji} ${action.toUpperCase()}
┃ 
┃ Usage:
┃ ${prefix}antidemote on  - Enable
┃ ${prefix}antidemote off - Disable
┃ ${prefix}antidemote status - Check status
┃ ${prefix}antidemote kick - Kick on demote attempt
┃ ${prefix}antidemote warn - Warn on demote attempt
┃ ${prefix}antidemote ban - Ban on demote attempt
┃ ${prefix}antidemote reset - Reset warnings
┃ 
┃ 🧛 "Admins are protected."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'on' || sub === 'enable') {
      config[chatId].enabled = true;
      if (!config[chatId].action) config[chatId].action = 'warn';
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

      // Hook into group events
      if (!global.antidemoteHooked) {
        global.antidemoteHooked = true;
        sock.ev.on('group-participants.update', async (update) => {
          try {
            if (update.action === 'demote') {
              const groupId = update.id;
              if (config[groupId]?.enabled) {
                const demoted = update.participants || [];
                const actor = update.actor || 'unknown';
                const actionType = config[groupId].action || 'warn';
                
                for (const p of demoted) {
                  // Re-promote the admin
                  await sock.groupParticipantsUpdate(groupId, [p], 'promote');
                  
                  // Take action against the person who tried to demote
                  if (actor !== p) {
                    const actorJid = actor;
                    
                    if (actionType === 'warn') {
                      if (!config[groupId].warnings[actorJid]) {
                        config[groupId].warnings[actorJid] = 0;
                      }
                      config[groupId].warnings[actorJid]++;
                      const warnCount = config[groupId].warnings[actorJid];
                      
                      await sock.sendMessage(groupId, {
                        text: `╭━━━〔 ⚠️ ANTI-DEMOTE WARNING 〕━━━┈⊷
┃ @${actorJid.split('@')[0]} tried to demote an admin!
┃ 
┃ ⚡ Warning: ${warnCount}/3
┃ ${warnCount >= 3 ? '🚨 This will result in removal!' : ''}
┃ 
┃ 🧛 "Power is protected."
╰━━━━━━━━━━━━━━━┈⊷`,
                        mentions: [actorJid]
                      });
                      
                      if (warnCount >= 3) {
                        try {
                          await sock.groupParticipantsUpdate(groupId, [actorJid], 'remove');
                          await sock.sendMessage(groupId, {
                            text: `╭━━━〔 🚨 USER REMOVED 〕━━━┈⊷
┃ @${actorJid.split('@')[0]} has been removed!
┃ Reason: Multiple demote attempts (${warnCount})
┃ 
┃ 🧛 "The darkness banishes."
╰━━━━━━━━━━━━━━━┈⊷`,
                            mentions: [actorJid]
                          });
                          delete config[groupId].warnings[actorJid];
                          fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
                        } catch {}
                      }
                      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
                    } else if (actionType === 'kick') {
                      try {
                        await sock.groupParticipantsUpdate(groupId, [actorJid], 'remove');
                        await sock.sendMessage(groupId, {
                          text: `╭━━━〔 🦶 USER KICKED 〕━━━┈⊷
┃ @${actorJid.split('@')[0]} has been kicked!
┃ Reason: Tried to demote an admin
┃ 
┃ 🧛 "The darkness banishes."
╰━━━━━━━━━━━━━━━┈⊷`,
                          mentions: [actorJid]
                        });
                      } catch {}
                    } else if (actionType === 'ban') {
                      try {
                        await sock.updateBlockStatus(actorJid, 'block');
                        await sock.groupParticipantsUpdate(groupId, [actorJid], 'remove');
                        await sock.sendMessage(groupId, {
                          text: `╭━━━〔 🚫 USER BANNED 〕━━━┈⊷
┃ @${actorJid.split('@')[0]} has been banned!
┃ Reason: Tried to demote an admin
┃ 
┃ 🧛 "The darkness banishes."
╰━━━━━━━━━━━━━━━┈⊷`,
                          mentions: [actorJid]
                        });
                      } catch {}
                    }
                  }
                }
              }
            }
          } catch (e) {
            console.log('Anti-demote error:', e.message);
          }
        });
      }

      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-DEMOTE ENABLED 〕━━━┈⊷
┃ Action: ${config[chatId].action.toUpperCase()}
┃ Admins cannot be demoted!
┃ 🧛 "Power is protected."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'off' || sub === 'disable') {
      config[chatId].enabled = false;
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-DEMOTE DISABLED 〕━━━┈⊷
┃ Admins can now be demoted.
┃ 🧛 "Power is vulnerable."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'status') {
      const status = config[chatId].enabled ? '🟢 ENABLED' : '🔴 DISABLED';
      const action = config[chatId].action || 'warn';
      const warnings = config[chatId].warnings || {};
      const warnCount = Object.keys(warnings).length;
      
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-DEMOTE STATUS 〕━━━┈⊷
┃ Status: ${status}
┃ Action: ${action.toUpperCase()}
┃ Active Warnings: ${warnCount}
┃ 
┃ 🧛 "The darkness protects."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'kick') {
      config[chatId].action = 'kick';
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-DEMOTE ACTION: KICK 〕━━━┈⊷
┃ Users who try to demote admins will be kicked!
┃ 🧛 "The darkness banishes."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'warn') {
      config[chatId].action = 'warn';
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-DEMOTE ACTION: WARN 〕━━━┈⊷
┃ Users who try to demote admins will be warned!
┃ 🧛 "The darkness warns."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'ban') {
      config[chatId].action = 'ban';
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-DEMOTE ACTION: BAN 〕━━━┈⊷
┃ Users who try to demote admins will be banned!
┃ 🧛 "The darkness banishes."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'reset') {
      config[chatId].warnings = {};
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ WARNINGS RESET 〕━━━┈⊷
┃ All warnings have been cleared.
┃ 🧛 "The darkness forgives."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    return sock.sendMessage(chatId, {
      text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Usage: ${prefix}antidemote on/off/status/kick/warn/ban/reset
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
