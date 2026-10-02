<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project: Distil-Nation NZ

### Build & Verify
- `npm run dev` — development server
- `npm run build` — production build (requires .env.local with Supabase credentials)
- `npm run lint` — ESLint

### Architecture
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Database**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS 4, shadcn/ui, Framer Motion
- **Content**: Markdown (content/kb/, content/news/) via gray-matter
- **Maps**: React-Leaflet
- **Podcast**: Spreaker API with mock fallback

### Key Routes
- `/` — Homepage with Passport showcase
- `/passport` — Passport dashboard (protected)
- `/passport/collection` — Spirit card collection
- `/passport/badges` — Badge/achievement progress
- `/passport/quests` — Discovery quests
- `/spirits/` — Spirit listing
- `/spirits/[slug]/` — Spirit detail + Add to Passport
- `/distilleries/` — Distillery directory
- `/distilleries/[slug]/` — Distillery detail with Passport panel
- `/profile/[id]` — Public user profiles
- `/admin` — Admin dashboard (role=admin)
- `/api/search` — Unified search API
- `/api/passport` — Passport data API
- `/api/spirits` — Spirits data API

### Database Migrations
Run in order in Supabase SQL Editor:
1. `supabase/migrations/0001_init.sql` — profiles + passport_entries
2. `supabase/migrations/0002_passport_redesign.sql` — array-based statuses
3. `supabase/migrations/0003_passport_full.sql` — spirits, tastings, badges, quests

### Key Data Files
- `data/mock.ts` — distilleries, episodes, navItems, siteConfig
- `data/spirits.ts` — seed spirit/product data
- `lib/passport.ts` — achievement engine, stats, discovery suggestions
- `types/passport.ts` — all Passport-related TypeScript types
