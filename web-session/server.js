// web-session/server.js
//
// Vampire MD pairing site (QR-code based, matching the app's visual theme).
// Flow:
//   1. POST /api/qr/start           -> creates a linking session, returns { id }
//   2. GET  /api/qr/status/:id      -> polled every ~2.5s by the frontend:
//        { status: 'qr', qr: '<data:image/png;base64,...>' }   fresh QR to scan
//        { status: 'linked', sessionId }                        scan succeeded
//        { status: 'error', error }                             failed / timed out
//   3. Frontend renders the QR image; WhatsApp rotates the QR automatically
//      until the user scans it or the session times out.
//
// Session strings are only ever returned to the browser that requested them
// and are read once (then deleted server-side). Run separately from the bot
// process: `npm run session-web`.

import express from 'express';
import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || process.env.SESSION_WEB_PORT || 3000;
const sessions = new Map(); // id -> { status, qr, sessionId, error, sock, dir }

function cleanup(entry) {
  try { entry.sock?.ws?.close(); } catch {}
  try { if (entry.dir) fs.rmSync(entry.dir, { recursive: true, force: true }); } catch {}
}

app.get('/api/health', (req, res) => res.json({ online: true }));

app.post('/api/qr/start', async (req, res) => {
  const id = crypto.randomBytes(8).toString('hex');
  const sessionDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vampire-qr-'));
  const entry = { status: 'pending', dir: sessionDir };
  sessions.set(id, entry);

  try {
    const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers } = await import('@whiskeysockets/baileys');
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false,
      browser: Browsers.ubuntu('Chrome'),
      logger: { level: 'silent', child: () => ({ level: 'silent' }) }
    });
    entry.sock = sock;
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, qr } = update;

      if (qr && entry.status === 'pending') {
        try { entry.qr = await QRCode.toDataURL(qr, { margin: 1, scale: 6 }); } catch {}
      }

      if (connection === 'open' && entry.status === 'pending') {
        try {
          const creds = JSON.parse(fs.readFileSync(path.join(sessionDir, 'creds.json'), 'utf8'));
          entry.sessionId = `VAMPIRE-MD:${Buffer.from(JSON.stringify(creds)).toString('base64')}`;
          entry.status = 'linked';
        } catch {
          entry.status = 'error';
          entry.error = 'Failed to read generated session.';
        } finally {
          cleanup(entry);
        }
      }

      if (connection === 'close' && entry.status === 'pending') {
        entry.status = 'error';
        entry.error = 'Connection closed before linking finished. Please try again.';
        cleanup(entry);
      }
    });

    res.json({ id });

    setTimeout(() => {
      const e = sessions.get(id);
      if (e && e.status === 'pending') { e.status = 'error'; e.error = 'QR session timed out.'; cleanup(e); }
    }, 3 * 60 * 1000);
  } catch (err) {
    cleanup(entry);
    entry.status = 'error';
    entry.error = err.message || 'Failed to start pairing session.';
    if (!res.headersSent) res.status(500).json({ error: entry.error });
  }
});

app.get('/api/qr/status/:id', (req, res) => {
  const entry = sessions.get(req.params.id);
  if (!entry) return res.status(404).json({ error: 'Unknown session request.' });

  if (entry.status === 'linked') {
    const { sessionId } = entry;
    sessions.delete(req.params.id); // one-time read
    return res.json({ status: 'linked', sessionId });
  }
  if (entry.status === 'error') {
    sessions.delete(req.params.id);
    return res.json({ status: 'error', error: entry.error });
  }
  if (entry.qr) return res.json({ status: 'qr', qr: entry.qr });
  res.json({ status: 'pending' });
});

app.listen(PORT, () => {
  console.log(`🧛 Vampire MD pairing site running on http://localhost:${PORT}`);
});
