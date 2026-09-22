<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Creepster&size=45&duration=2500&pause=800&color=FF0000&center=true&vCenter=true&width=800&height=100&lines=%F0%9F%A7%9B+VAMPIRE+MD+V3;%F0%9F%A9%B8+OWNER+%26+DEV+EDITION;%F0%9F%94%98+INTERACTIVE+BUTTON+MENU;%F0%9F%8C%91+RISE+FROM+THE+DARKNESS" alt="Vampire MD" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/%F0%9F%A7%9B_VERSION-3.0.0-darkred?style=for-the-badge&labelColor=black&color=darkred" />
  <img src="https://img.shields.io/badge/%E2%9A%A1_NODE.JS-18+-darkred?style=for-the-badge&labelColor=black&color=darkred&logo=nodedotjs" />
  <img src="https://img.shields.io/badge/%F0%9F%94%A5_BAILEYS_%2B_my--md--btns-darkred?style=for-the-badge&labelColor=black&color=darkred" />
  <img src="https://img.shields.io/badge/%F0%9F%93%9C_LICENSE-MIT-darkred?style=for-the-badge&labelColor=black&color=darkred" />
</p>

> 🧛 *"In the shadows we code. In the darkness we deploy. We are Vampire MD."*
> — **Paxton, Vampire Tech**

---

## 🧛 What's new in V3

- 🔘 **Interactive button/list menu** powered by [`my-md-btns`](https://www.npmjs.com/package/my-md-btns) on top of the existing Baileys connection.
- 👑 **Owner** command set rebuilt from scratch (settings, prefix, sudo, broadcast, ban/unban, bot mode, restart, repo, session info).
- 🧑‍💻 **Dev** command set (`eval`, `botinfo`, `logs`, `update`, whitelisted `shell`).
- ⚙️ **Settings** category for runtime toggles (`autoread`, `autostatus`, `antilink`, `antidelete`, `antisudo`).
- 🧛 **Bot-core additions:** `.vv` / `.vv2` (reveal a quoted view-once photo/video), anti-delete forwarding to the owner DM, sudo-list locking.
- 🌐 **QR pairing site** (`web-session/`) — a standalone vampire-themed web app (styled after the screenshot) where you scan a QR code to generate a session, no terminal needed.
- ☁️ Split deployment: the **pairing site** runs as a `web` process (needs a port), the **bot** runs as a `worker` process (no port) — configured for **Render**, **Railway**, **Koyeb**, and Heroku-style platforms (`app.json`).
- 🧹 `prefix_config.json` / `bot_mode.json` / `auto_join_log.json` are no longer committed — `index.js` creates/updates them on its own at runtime, so shipping stale copies just caused conflicts.
- 🧹 All previous command bundles were removed to give you a clean base to build on.

---

## 👑 Owner

- Number: `263776699348`
- Repo: https://github.com/gpaxton428-collab/Vampire-MD

---

## 🚀 Deploy

Vampire MD ships as **two processes**: a `web` process (the pairing site, needs a port) and a
`worker` process (the actual bot, no port — it just holds a WhatsApp connection open).

| Platform | How |
|---|---|
| **Render** | Connect this repo → `render.yaml` defines both `vampire-md-pairing` (web) and `vampire-md-bot` (worker) services automatically. |
| **Railway** | `railway up` or connect the repo → `railway.json` starts the pairing site; add a second service pointing at `node index.js` for the bot. |
| **Koyeb** | `koyeb.yaml` / `Dockerfile.pairing` deploy the pairing site; run the bot itself as a separate Koyeb worker service with `Dockerfile`. |
| **Heroku-style panels** | `app.json` + `Procfile` define `web` (pairing site) and `worker` (bot) dynos. |
| **Docker (self-host)** | Bot: `docker build -t vampire-md . && docker run -e SESSION_ID=... vampire-md` · Pairing site: `docker build -f Dockerfile.pairing -t vampire-md-pairing . && docker run -p 3000:3000 vampire-md-pairing` |

All platforms need at minimum: `OWNER_NUMBER`, `PREFIX`, and `SESSION_ID` on the **bot/worker** service.

---

## 🌐 Generating a session (QR pairing site)

```bash
npm install
npm run session-web
```

Open `http://localhost:3000` (or your deployed pairing site URL) and tap **Generate QR Code**,
then on your phone: WhatsApp → Linked Devices → Link a Device → scan the code. Once linked, copy
the session string shown and paste it into `SESSION_ID` on your bot/worker deployment.

⚠️ **Treat the session string like a password.** Anyone who has it can send messages and read
chats as that WhatsApp account. Never commit it to a public repo or paste it in a public chat.

---

## 🛠️ Local development

```bash
git clone https://github.com/gpaxton428-collab/Vampire-MD.git
cd Vampire-MD
npm install
cp .env.example .env   # fill in OWNER_NUMBER etc.
npm run dev
```

---

## 📦 Command categories

- `owner` — bot administration (owner-only)
- `dev` — debugging/maintenance tools (owner-only)
- `settings` — runtime toggles (owner-only)
- `info` — `.menu` (interactive button/list menu)

Send `.menu` (or your configured prefix + `menu`) to the bot to see everything available.

---

## 📄 License

MIT © Vampire Tech
