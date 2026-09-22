// lib/buttons.js
// Thin wrapper around "my-md-btns" so the rest of the bot never has to
// import the library directly. If my-md-btns is ever swapped out, only
// this file needs to change.
//
// my-md-btns works on top of any Baileys-compatible socket (including the
// stock @whiskeysockets/baileys socket already used in index.js), so no
// change to the connection layer is required to use it.

import {
  sendButtons as _sendButtons,
  sendList as _sendList,
  sendCarousel as _sendCarousel,
  sendPoll as _sendPoll,
  quickReply,
  urlBtn,
  copyBtn,
  callBtn,
  listSection
} from 'my-md-btns';

export async function sendButtons(sock, jid, opts, extra = {}) {
  try {
    return await _sendButtons(sock, jid, opts, extra);
  } catch (err) {
    // Fallback to a plain text message if the client/session doesn't
    // support native flow buttons for any reason.
    const fallback = [opts.text, opts.footer].filter(Boolean).join('\n\n');
    return sock.sendMessage(jid, { text: fallback }, extra);
  }
}

export async function sendList(sock, jid, opts, extra = {}) {
  try {
    return await _sendList(sock, jid, opts, extra);
  } catch (err) {
    const fallback = [opts.text, opts.title].filter(Boolean).join('\n\n');
    return sock.sendMessage(jid, { text: fallback }, extra);
  }
}

export async function sendCarousel(sock, jid, opts, extra = {}) {
  try {
    return await _sendCarousel(sock, jid, opts, extra);
  } catch (err) {
    return sock.sendMessage(jid, { text: opts.text || '' }, extra);
  }
}

export async function sendPoll(sock, jid, opts, extra = {}) {
  try {
    return await _sendPoll(sock, jid, opts, extra);
  } catch (err) {
    return sock.sendMessage(jid, { text: `📊 ${opts.name}\n${(opts.values || []).map(v => `• ${v}`).join('\n')}` }, extra);
  }
}

export { quickReply, urlBtn, copyBtn, callBtn, listSection };
