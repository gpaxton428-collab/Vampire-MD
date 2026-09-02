export function fmt(text) {
  return text;
}

export function getStr(key) {
  const strings = {
    botName: 'Vampire MD',
    owner: 'Paxton',
    version: 'V2.5.0',
    prefix: '.',
    footer: '> Powered by Paxton'
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
    border: '╭━━━〔 🌑 VAMPIRE MD V2.5.0 〕━━━┈⊷'
  };
}
