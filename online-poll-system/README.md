# Online Poll System

A simple, web app for creating polls, voting, and viewing results. Built with Next.js (Pages Router) and an in-memory data store for quick iteration.

## What This Builds

- Create a poll with a question and multiple options.
- Share and vote on active polls.
- Toggle poll status between `active` and `closed`.
- View results as bar or pie charts.
- Filter and search polls on the homepage.

## Tech Stack

- Next.js (Pages Router)
- React
- Minimal Redux Toolkit usage for client state
- In-memory store for API routes (no external DB)

## Install From GitHub

```bash
# 1) Clone the repository
git clone https://github.com/your-username/alx-project-nexus.git

# 2) Enter the project and app folder
cd alx-project-nexus/online-poll-system

# 3) Install dependencies
npm install
# or: yarn install / pnpm install / bun install

# 4) Run the development server
npm run dev

# 5) Open the app
# visit http://localhost:3000
```

## App Routes

- `/` — Browse, search, and filter polls.
- `/create` — Create a new poll.
- `/poll/[id]` — Vote on a poll.
- `/poll/[id]/results` — View results (bar or pie chart).

## API Endpoints

- `GET /api/polls` — List polls.
- `POST /api/polls` — Create poll `{ question, options[] }`.
- `POST /api/polls/:id/vote` — Vote `{ optionId }`.
- `PATCH /api/polls/:id/status` — Set status `{ status: 'active'|'closed' }`.

Note: Data is stored in memory for development; restarting the dev server resets it.

## Project Structure

```
online-poll-system/
  components/        # UI components (e.g., Header, PollCard)
  lib/               # In-memory data store and helpers
  pages/             # Pages and API routes
  store/             # Client-side state (Redux Toolkit)
  styles/            # Global styles
```

## Scripts

- `npm run dev` — Start the dev server.
- `npm run build` — Production build.
- `npm run start` — Run production build.

## Deployment

Build with `npm run build` and host the `.next` output with any Node-friendly platform. Vercel works out of the box.
