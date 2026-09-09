import fs from 'fs';

export default {
  name: 'antipromote',
  description: 'Prevent members from being promoted - with kick option',
  category: 'group',
  aliases: ['antiprom', 'ap'],
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

    const configFile = './antipromote.json';
    let config = {};
    if (fs.existsSync(configFile)) {
      try {
        config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      } catch {}
    }

    if (!config[chatId]) config[chatId] = { 
      enabled: false, 
      action: 'warn',
      warnings: {}
    };

    if (!sub || !['on', 'off', 'status', 'kick', 'warn', 'ban', 'reset'].includes(sub)) {
      const status = config[chatId].enabled ? '🟢 ENABLED' : '🔴 DISABLED';
      const action = config[chatId].action || 'warn';
      const actionEmoji = action === 'kick' ? '🦶' : action === 'ban' ? '🚫' : '⚠️';
      
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-PROMOTE STATUS 〕━━━┈⊷
┃ Status: ${status}
┃ Action: ${actionEmoji} ${action.toUpperCase()}
┃ 
┃ Usage:
┃ ${prefix}antipromote on  - Enable
┃ ${prefix}antipromote off - Disable
┃ ${prefix}antipromote status - Check status
┃ ${prefix}antipromote kick - Kick on promote attempt
┃ ${prefix}antipromote warn - Warn on promote attempt
┃ ${prefix}antipromote ban - Ban on promote attempt
┃ ${prefix}antipromote reset - Reset warnings
┃ 
┃ 🧛 "Power is controlled."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'on' || sub === 'enable') {
      config[chatId].enabled = true;
      if (!config[chatId].action) config[chatId].action = 'warn';
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

      // Hook into group events
      if (!global.antipromoteHooked) {
        global.antipromoteHooked = true;
        sock.ev.on('group-participants.update', async (update) => {
          try {
            if (update.action === 'promote') {
              const groupId = update.id;
              if (config[groupId]?.enabled) {
                const promoted = update.participants || [];
                const actor = update.actor || 'unknown';
                const actionType = config[groupId].action || 'warn';
                
                for (const p of promoted) {
                  // Demote the member back
                  await sock.groupParticipantsUpdate(groupId, [p], 'demote');
                  
                  // Take action against the person who tried to promote
                  if (actor !== p) {
                    const actorJid = actor;
                    
                    if (actionType === 'warn') {
                      if (!config[groupId].warnings[actorJid]) {
                        config[groupId].warnings[actorJid] = 0;
                      }
                      config[groupId].warnings[actorJid]++;
                      const warnCount = config[groupId].warnings[actorJid];
                      
                      await sock.sendMessage(groupId, {
                        text: `╭━━━〔 ⚠️ ANTI-PROMOTE WARNING 〕━━━┈⊷
┃ @${actorJid.split('@')[0]} tried to promote a member!
┃ 
┃ ⚡ Warning: ${warnCount}/3
┃ ${warnCount >= 3 ? '🚨 This will result in removal!' : ''}
┃ 
┃ 🧛 "Power is controlled."
╰━━━━━━━━━━━━━━━┈⊷`,
                        mentions: [actorJid]
                      });
                      
                      if (warnCount >= 3) {
                        try {
                          await sock.groupParticipantsUpdate(groupId, [actorJid], 'remove');
                          await sock.sendMessage(groupId, {
                            text: `╭━━━〔 🚨 USER REMOVED 〕━━━┈⊷
┃ @${actorJid.split('@')[0]} has been removed!
┃ Reason: Multiple promote attempts (${warnCount})
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
┃ Reason: Tried to promote a member
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
┃ Reason: Tried to promote a member
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
            console.log('Anti-promote error:', e.message);
          }
        });
      }

      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-PROMOTE ENABLED 〕━━━┈⊷
┃ Action: ${config[chatId].action.toUpperCase()}
┃ Members cannot be promoted!
┃ 🧛 "Power is contained."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'off' || sub === 'disable') {
      config[chatId].enabled = false;
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ANTI-PROMOTE DISABLED 〕━━━┈⊷
┃ Members can now be promoted.
┃ 🧛 "Power is free."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'status') {
      const status = config[chatId].enabled ? '🟢 ENABLED' : '🔴 DISABLED';
      const action = config[chatId].action || 'warn';
      const warnings = config[chatId].warnings || {};
      const warnCount = Object.keys(warnings).length;
      
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 🛡️ ANTI-PROMOTE STATUS 〕━━━┈⊷
┃ Status: ${status}
┃ Action: ${action.toUpperCase()}
┃ Active Warnings: ${warnCount}
┃ 
┃ 🧛 "The darkness controls."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'kick') {
      config[chatId].action = 'kick';
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-PROMOTE ACTION: KICK 〕━━━┈⊷
┃ Users who try to promote members will be kicked!
┃ 🧛 "The darkness banishes."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'warn') {
      config[chatId].action = 'warn';
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-PROMOTE ACTION: WARN 〕━━━┈⊷
┃ Users who try to promote members will be warned!
┃ 🧛 "The darkness warns."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }

    if (sub === 'ban') {
      config[chatId].action = 'ban';
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      return sock.sendMessage(chatId, {
        text: `╭━━━〔 ✅ ANTI-PROMOTE ACTION: BAN 〕━━━┈⊷
┃ Users who try to promote members will be banned!
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
┃ Usage: ${prefix}antipromote on/off/status/kick/warn/ban/reset
╰━━━━━━━━━━━━━━━┈⊷`
    }, { quoted: msg });
  }
};
