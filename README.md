# 2D Platformer Game (Phaser + Next.js) — Full Stack Setup

A 2D platformer browser game built with Phaser and Next.js, featuring a simple leaderboard backed by PostgreSQL.

---

## ✅ Tech Stack (Final)

### Runtime / Tooling
- **Node.js**: `25.2.1` (existing)
- **pnpm**: `10.22` (existing)

> Note: Node 25 is not an LTS release. For production deployments, consider using **Node 20 LTS** in hosting environments, but local development on Node 25 is fine.

---

## Frontend (Game Client)

### Framework / UI
- **Next.js**: `16.1.x`
- **React**: `18.x` (managed by Next.js)

### Game Engine
- **Phaser**: `3.90.0`

### Language
- **TypeScript**: `5.7+` (recommended for reliability)

---

## Backend (Leaderboard API)

### API Layer
- **Next.js Route Handlers** (`/app/api/...`)  
  No separate Express server required. Your leaderboard API lives inside the Next.js app.

### Input validation
- **Zod**: `3.x` (recommended)

### Rate limiting (to reduce leaderboard abuse)
- **Upstash Ratelimit**: latest (optional but recommended)

---

## Database

### Database Engine
- **PostgreSQL**: `18.x`

### ORM / Migrations
- **Prisma ORM**: `7.2.x`

---

## Deployment

### Recommended Hosting (simplest for fullstack)
- **Vercel** for Next.js app (frontend + API)

### PostgreSQL Providers
- **Supabase Postgres**

---

## 📁 Project Structure

```
2d-platformer-game/
├── .env.local                    # Environment variables
├── .env.example                  # Environment template
├── .gitignore
├── README.md
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── next.config.js
├── tailwind.config.js            # Optional: for UI styling
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Auto-generated migrations
├── public/
│   ├── assets/
│   │   ├── sprites/              # Game sprites/images
│   │   ├── audio/                # Sound effects/music
│   │   └── maps/                 # Level data/tilemaps
│   └── favicon.ico
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Home/landing page
│   │   ├── game/
│   │   │   └── page.tsx          # Game page
│   │   ├── leaderboard/
│   │   │   └── page.tsx          # Leaderboard page
│   │   └── api/
│   │       └── leaderboard/
│   │           ├── route.ts      # GET/POST leaderboard entries
│   │           └── [id]/
│   │               └── route.ts  # Individual score operations
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   └── ScoreCard.tsx
│   │   └── game/                 # Game-specific components
│   │       └── GameCanvas.tsx    # Phaser game wrapper
│   ├── game/                     # Phaser game logic
│   │   ├── index.ts              # Game initialization
│   │   ├── config.ts             # Phaser configuration
│   │   ├── scenes/
│   │   │   ├── PreloadScene.ts   # Asset loading
│   │   │   ├── MenuScene.ts      # Main menu
│   │   │   ├── GameScene.ts      # Main gameplay
│   │   │   └── GameOverScene.ts  # Game over/score submission
│   │   ├── entities/
│   │   │   ├── Player.ts         # Player character
│   │   │   ├── Enemy.ts          # Enemy entities
│   │   │   └── Collectible.ts    # Items/coins
│   │   └── utils/
│   │       ├── physics.ts        # Physics helpers
│   │       └── input.ts          # Input handling
│   ├── lib/
│   │   ├── db.ts                 # Prisma client setup
│   │   ├── validations.ts        # Zod schemas
│   │   └── ratelimit.ts          # Rate limiting setup
│   └── types/
│       ├── game.ts               # Game-related types
│       └── api.ts                # API response types
└── docs/                         # Optional: documentation
    ├── SETUP.md                  # Setup instructions
    └── GAME_DESIGN.md            # Game design document
```

## 🚀 Quick Start

1. **Initialize the project**
   ```bash
   pnpm create next-app@latest 2d-platformer-game --typescript --tailwind --eslint --app
   cd 2d-platformer-game
   ```

2. **Install dependencies**
   ```bash
   pnpm add phaser prisma @prisma/client zod
   pnpm add -D @types/node
   ```

3. **Setup database**
   ```bash
   npx prisma init
   # Configure your DATABASE_URL in .env.local
   npx prisma db push
   ```

4. **Run development server**
   ```bash
   pnpm dev
   ```


---

## 🎮 Game Controls

| Action | Keys |
|--------|------|
| Jump | `W` or `↑` or `Space` |
| Move Left | `A` or `←` |
| Move Right | `D` or `→` |
| Drop/Fast Fall | `S` or `↓` |

---

## 📂 Current Project Status

### Implemented
- ✅ Next.js 16 + TypeScript + Tailwind CSS
- ✅ Phaser 3.90 game engine integration
- ✅ Scene flow: Instructions → Menu → Tutorial Rooms → Test Level
- ✅ Player entity with full movement controls
- ✅ Basic platform physics
- ✅ PostgreSQL + Prisma ORM setup
- ✅ Leaderboard API (GET/POST endpoints)
- ✅ Input validation with Zod

### To Be Implemented
- ⏳ Obstacle entities (Red Spikes, Blue Surfaces, Time Crystals)
- ⏳ Enemy entities (Ground, Flying)
- ⏳ Health & damage system
- ⏳ Timer system with pause
- ⏳ Score calculation
- ⏳ Leaderboard UI page
- ⏳ Options/Settings menu
- ⏳ Game assets (sprites, audio)

---

## 🚀 Getting Started

See [SETUP.md](./SETUP.md) for detailed installation and setup instructions.

**Quick start:**
```bash
# Install dependencies
pnpm install

# Setup database
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL

# Initialize database
npx prisma generate
npx prisma db push

# Run development server
pnpm dev
```

---

## 📖 Documentation

- **[SETUP.md](./SETUP.md)** - Installation and setup guide
- **[Game Flow Specification](.kiro/steering/game-flow-and-mechanics.md)** - Complete game mechanics and design document

---

## 🏗️ Architecture

- **Frontend**: Next.js 16 (App Router) + React 18
- **Game Engine**: Phaser 3.90
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 18 + Prisma ORM 7.2
- **Validation**: Zod 3.x
- **Styling**: Tailwind CSS
- **Language**: TypeScript 5.7+

---

## 📝 License

MIT
