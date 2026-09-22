export function fmt(text) {
  return text;
}

export function getStr(key) {
  const strings = {
    botName: process.env.BOT_NAME || 'Vampire MD',
    owner: process.env.OWNER_NAME || 'Paxton',
    version: 'V3.0.0',
    prefix: process.env.PREFIX || '.',
    footer: process.env.BOT_FOOTER || '> Powered by Vampire Tech',
    repo: process.env.GITHUB_REPO || 'https://github.com/gpaxton428-collab/Vampire-MD'
  };
  return strings[key] || key;
}

export function getTheme() {
  return {
    primary: '🧛',
    secondary: '🩸',
    accent: '🌑',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    border: '╭━━━〔 🌑 VAMPIRE MD V3.0.0 〕━━━┈⊷'
  };
}
