# LaunchAxsi – Ecosystem platform MVP

MVP for a founder–investor–startup ecosystem platform. Demonstrates **software architecture**, **database design**, **LLM/AI integration**, and **product thinking**.

## Features

- **Dashboard** – Overview of startups, investors, events
- **Startups** – Full CRUD; dynamic fields and validation (Zod)
- **Investors** – Full CRUD; discovery by focus and check size
- **Pipeline** – Deal flow Kanban tracking opportunities
- **Dual flow** – Single view for founders (find investors) and investors (discover startups)
- **Fundraising** – Rounds per startup
- **Accelerator** – Programs and deadlines
- **Community** – Curated networking directory
- **Events** – Create and list events (webinars, meetups, demo days)
- **Documents** – Pitch decks / one-pagers; **AI pitch analysis**
- **Messages** – Split-pane threaded inbox
- **AI Assistant** – Live chat with prompt chips for pitch feedback
- **Architecture** – Visual diagram of the platform tech stack
- **DB Schema** – Interactive visualization of Prisma models

## Tech stack

- **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS**
- **Prisma** + **SQLite** (default; no DB server required; normalized entities, relations, JSON for scoring)
- **Google Gemini** (`gemini-1.5-flash` via `@google/genai`) for pitch deck analysis and AI assistant
- **Zod** for validation; **Server Actions** for mutations

## Database design (high level)

- `User` – roles: founder, investor, developer, admin
- `Startup` – stage, industry, founder relation
- `Investor` – check size, focus areas, stages (arrays)
- `Event`, `Document`, `PitchDeckAnalysis` (with criteriaScores JSON, suggestions array)
- `FundraisingRound`, `AcceleratorProgram`, `Message`, `Connection`, `AssistantChat` / `AssistantMessage`

## Setup

1. **Clone and install**

   ```bash
   cd ifav && npm install
   ```

2. **Database (SQLite by default)**

   No database server needed. Create the SQLite DB and seed:

   ```bash
   cp .env.example .env
   # Add GEMINI_API_KEY to .env for AI features
   npx prisma db push
   npm run db:seed
   ```

3. **Gemini**

   Set `GEMINI_API_KEY` in `.env` for:
   - **Documents → Analyze with AI** (pitch deck scoring and suggestions)
   - **AI Assistant** (chat)

4. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000); you’re redirected to `/dashboard`.

## Scripts

- `npm run dev` – Dev server
- `npm run build` / `npm run start` – Build and start
- `npm run db:push` – Push schema (no migration files)
- `npm run db:migrate` – Run migrations
- `npm run db:seed` – Seed demo data

## Architecture notes

- **Server Actions** for all mutations (startups, investors, events, documents, assistant); forms use `useActionState` where needed.
- **AI pitch analysis**: stored pitch text (or pasted content) is sent to Gemini; response is parsed (JSON) and saved in `PitchDeckAnalysis` (overallScore, criteriaScores, feedback, suggestions).
- **AI Assistant**: conversation stored in `AssistantChat` / `AssistantMessage`; each user message triggers a Gemini completion and an assistant message is appended.
- **Dual flow** page shows both “for founders” and “for investors” entry points with links to filtered lists.
