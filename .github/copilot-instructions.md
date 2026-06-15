**Repository Overview**
- **Purpose:** Frontend Next.js (App Router) application for iTax Easy. Backend API lives in a separate repo and is consumed via environment-backed Axios clients.
- **Primary stack:** `Next.js 14` (App Router), `React 18`, `Redux Toolkit`, `Prisma` (Postgres/MySQL), `TailwindCSS`, `Styled Components`.

**Important Entry Points**
- **App root:** `src/app/layout.js` — sets up `ReduxProvider`, `StoreProvider`, global styles, `ToastContainer`, and performance prefetching.
- **API clients:** `src/lib/axios.js` — uses `NEXT_PUBLIC_URL` and `NEXT_PUBLIC_BASE_URL` for client/server Axios instances. Change base URLs here only if env patterns change.
- **Database client:** `src/lib/db.js` — uses a singleton `PrismaClient` attached to `global` in dev to avoid connection exhaustion.
- **Prisma schema:** `prisma/schema.prisma` — canonical DB model. Use `npm run generate` and `npm run db` (see `package.json`).


**Build & Dev Workflows**
- **Start dev server:** `npm run dev` (runs `next dev -p 3001`). The app expects port `3001` by default.
- **Build & serve:** `npm run build` then `npm start` (production server on port `3001`).
- **Prisma:** `npm run generate` (client) and `npm run db` (push schema). Use these after changing `prisma/schema.prisma`.
- **Docker:** `docker-compose up -d` supported; `Dockerfile` + `docker-compose.yml` live at repo root. See `README.md` for example build args.

**Environment Patterns**
- Env files live at project root (see `.env.example` and `src/.env` in repo). Important keys:
  - `DATABASE_URL` — Prisma DB connection (Postgres/MySQL examples in README).
  - `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_BASE_URL` — used by `src/lib/axios.js`.
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` — payment gateway.
  - `NEXT_PUBLIC_WEB_TOKEN` / `JWT_SECRET` — JWT usage.
- **Note:** `NEXT_PUBLIC_*` variables are exposed to the browser. Keep secrets (`RAZORPAY_KEY_SECRET`, `JWT_SECRET`) out of client-exposed vars.

**Project Conventions & Patterns**
- **App Router + Providers:** Global providers are mounted in `src/app/layout.js`. Add global context providers there.
- **Prisma singleton:** Always import `prisma` from `src/lib/db.js` to reuse the same client and avoid connection leaks in development.
- **Axios usage:** Use `default export` `userAxios` for client-side calls and `nodeAxios` when a server-targeted base is needed.
- **Redux slices:** Central store defined in `src/store/index.js` and slices under `src/store/slices/`. New slices should be combined in `index.js`.
- **Prefetching & performance:** Components under `src/components/performance/` implement prefetching; follow their patterns when adding async data preloads.

**Testing & Linting Notes**
- `package.json` has `lint` and `format` scripts. `next.config.js` disables lint during build (`ignoreDuringBuilds: true`) — CI should still run `npm run lint` separately.

**Files to Inspect for Context When Working**
- `prisma/schema.prisma` — DB models and enums (user roles, ledger types, etc.).
- `src/app/layout.js` — global providers and layout scaffolding.
- `src/lib/axios.js`, `src/lib/db.js` — integration plumbing for HTTP and DB.
- `src/.env` and `.env.example` — real env keys and examples used by the team.
- `README.md` — authoritative dev/run instructions and Docker examples.

**Examples (copy-paste friendly)**
- Start dev server:
  ```bash
  npm install
  npm run generate
  npm run db
  npm run dev
  ```
- Add a new Prisma model flow:
  1. Edit `prisma/schema.prisma`
  2. Run `npm run generate`
  3. Run `npm run db` (or use migrations in `prisma/migrations` if preferred)

**When You Are Unsure**
- Prefer reading `README.md` and `prisma/schema.prisma` first to understand data shapes and expected backend behavior.
- Check `src/lib/axios.js` for which base URL to target. If internal server code needs backend communication, prefer `nodeAxios`.

If anything in this file is unclear or you want additional examples (routing patterns, common components, or preferred testing commands), tell me which area to expand. 
