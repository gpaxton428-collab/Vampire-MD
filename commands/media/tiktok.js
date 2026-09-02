export default {
  name: 'tiktok',
  description: 'Download TikTok videos without watermark',
  category: 'media',
  aliases: ['tt', 'ttdl'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const url = args[0];

    if (!url) {
      await sock.sendMessage(chatId, {
        text: `❌ Please provide a TikTok URL!\n\nExample: ${prefix}tiktok https://www.tiktok.com/@username/video/123456789`
      }, { quoted: msg });
      return;
    }

    try {
      await sock.sendMessage(chatId, { text: '⏳ Downloading TikTok video...' }, { quoted: msg });

      let response = await fetch(`https://apix.wolvarex.com/api/download/tiktok/ssstik?url=${encodeURIComponent(url)}&key=wxa_d_test`);
      let data = await response.json();

      if (!data.success) {
        response = await fetch(`https://apix.wolvarex.com/api/download/tiktok/ssstik/proxy?url=${encodeURIComponent(url)}&key=wxa_d_test`);
        data = await response.json();
      }

      if (data.success && data.result) {
        const videoUrl = data.result.video || data.result.url || data.result.download;
        if (videoUrl) {
          await sock.sendMessage(chatId, {
            video: { url: videoUrl },
            caption: `📱 *TikTok Downloader*\n\n✅ Video downloaded successfully!\n\n> Powered by Apix`
          }, { quoted: msg });
        } else {
          await sock.sendMessage(chatId, {
            text: '❌ Could not find download link. Please try again.'
          }, { quoted: msg });
        }
      } else {
        await sock.sendMessage(chatId, {
          text: '❌ Failed to download TikTok video. Please check the URL and try again.'
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: `❌ Error: ${error.message}`
      }, { quoted: msg });
    }
  }
};
