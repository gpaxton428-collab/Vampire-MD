export default {
  name: 'facebook',
  description: 'Download a Facebook video',
  category: 'download',
  aliases: ['fb', 'fbdl'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const url = args[0];

    if (!url) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 📥 FACEBOOK DOWNLOADER 〕━━━┈⊷
┃ Download Facebook videos
┃ 
┃ Usage: ${prefix}fb <facebook_url>
┃ 
┃ Example: ${prefix}fb https://www.facebook.com/watch/?v=123456789
┃ 
┃ 🧛 "Download from the darkness."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch|m\.facebook\.com|fb\.com)\b/i;
    if (!urlRegex.test(url)) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Please provide a valid Facebook URL.
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(chatId, { text: '📥 Fetching Facebook video...' }, { quoted: msg });

    try {
      const videoUrl = await fetchVideo(url);
      
      if (!videoUrl) {
        await sock.sendMessage(chatId, {
          text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ Failed to download video.
┃ Try using: snapsave.app or fdown.net
┃ 
┃ 🧛 "Some secrets are better left buried."
╰━━━━━━━━━━━━━━━┈⊷`
        }, { quoted: msg });
        return;
      }

      await sock.sendMessage(chatId, {
        video: { url: videoUrl },
        caption: `╭━━━〔 📥 FACEBOOK DOWNLOADER 〕━━━┈⊷
┃ ✅ Video downloaded successfully!
┃ 
┃ 🧛 "Darkness captured."
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
      
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `╭━━━〔 ❌ ERROR 〕━━━┈⊷
┃ ${error.message}
┃ 
┃ Try using: snapsave.app or fdown.net
╰━━━━━━━━━━━━━━━┈⊷`
      }, { quoted: msg });
    }
  }
};

// ─── Download Strategies ─────────────────────────────────────

async function fetchVideo(url) {
  const strategies = [
    tryCobalt,
    trySnapsave,
    tryFdown,
    tryGetVideoUrl,
    tryFdownloader
  ];

  for (const strategy of strategies) {
    try {
      const result = await strategy(url);
      if (result) return result;
    } catch (e) {
      console.log(`[FB] Strategy ${strategy.name} failed:`, e.message);
    }
  }
  return null;
}

// Strategy 1: cobalt.tools
async function tryCobalt(url) {
  try {
    const response = await fetch('https://api.cobalt.tools/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, downloadMode: 'auto' })
    });
    const data = await response.json();
    
    if (data?.status === 'redirect' || data?.status === 'stream') {
      return data.url;
    }
    if (data?.status === 'picker' && data.picker?.length) {
      const video = data.picker.find(i => i.type === 'video') || data.picker[0];
      return video?.url;
    }
    return null;
  } catch { return null; }
}

// Strategy 2: snapsave.app
async function trySnapsave(url) {
  try {
    const response = await fetch('https://snapsave.app/action.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(url)}`
    });
    const html = await response.text();
    const match = html.match(/href=["'](https?:\/\/[^"']*\.mp4[^"']*)["']/i);
    return match?.[1] || null;
  } catch { return null; }
}

// Strategy 3: fdown.net
async function tryFdown(url) {
  try {
    const response = await fetch('https://fdown.net/search.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `URLz=${encodeURIComponent(url)}`
    });
    const html = await response.text();
    const match = html.match(/id=["']?hdlink["']?[^>]*href=["']([^"']+)["']/i) ||
                  html.match(/id=["']?sdlink["']?[^>]*href=["']([^"']+)["']/i) ||
                  html.match(/href=["'](https?:\/\/[^"']+\.mp4[^"']*)["']/i);
    return match?.[1]?.replace(/&amp;/g, '&') || null;
  } catch { return null; }
}

// Strategy 4: getvideourl.com
async function tryGetVideoUrl(url) {
  try {
    const response = await fetch('https://getvideourl.com/api/facebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(url)}`
    });
    const data = await response.json();
    return data?.hd || data?.sd || data?.url || null;
  } catch { return null; }
}

// Strategy 5: fdownloader.net
async function tryFdownloader(url) {
  try {
    const response = await fetch('https://fdownloader.net/api/ajaxSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: `q=${encodeURIComponent(url)}&lang=en&web=facebook`
    });
    const html = await response.text();
    const match = html.match(/href=["'](https?:\/\/[^"']*video[^"']*)\s*["'][^>]*>\s*(?:HD|High)/i) ||
                  html.match(/href=["'](https?:\/\/[^"']*video[^"']*)\s*["'][^>]*>\s*(?:SD|Normal)/i) ||
                  html.match(/href=["'](https?:\/\/[^"']+\.mp4[^"']*)["']/i);
    return match?.[1] || null;
  } catch { return null; }
}
