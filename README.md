# DARVELOUR

A full-stack dress boutique storefront + admin panel.

- **Frontend:** Vite + React (TypeScript). Two entry points — the shop (`index.html`) and the admin panel (`admin.html`).
- **Backend:** Express API, deployed as a Vercel serverless function (`api/index.js`).
- **Database:** libSQL / [Turso](https://turso.tech) in production; on-disk SQLite file for local dev.
- **Image uploads:** [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) in production; `server/uploads/` locally.

## Local development

```bash
npm install
cp .env.example .env        # fill in secrets; DB can stay on the local file fallback

npm run db:init             # create tables + seed data
npm run server              # API on http://localhost:5001
npm run dev                 # frontend on http://localhost:3000 (proxies /api -> :5001)
```

Admin panel: http://localhost:3000/admin.html — default login `admin@darvelour.com` / `admin123` (change this).

## Deploying to Vercel

1. **Database (Turso):** create a database, then run the schema/seed against it once:
   ```bash
   TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... npm run db:init
   ```
2. **Blob:** in the Vercel project, add a Blob store (Storage tab). `BLOB_READ_WRITE_TOKEN` is injected automatically.
3. **Environment variables** (Vercel → Settings → Environment Variables):

   | Variable | Required | Notes |
   |----------|----------|-------|
   | `TURSO_DATABASE_URL` | ✅ | `libsql://...` from Turso |
   | `TURSO_AUTH_TOKEN` | ✅ | Turso token |
   | `JWT_SECRET` | ✅ | long random string |
   | `ADMIN_SECRET` | ✅ | different long random string |
   | `BLOB_READ_WRITE_TOKEN` | auto | added by Vercel Blob — do not set manually |

4. Deploy. Build settings are pinned in `vercel.json` (build command `npm run build`, output `build/`, API routed to the serverless function).
