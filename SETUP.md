# DOWN - Setup Guide

## Prerequisites

- Node.js 25.2.1 (or Node 20 LTS for production)
- pnpm 10.22
- PostgreSQL 18.x (local or cloud provider)

## Installation Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Database

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/down_platformer"
```

### 3. Initialize Database

```bash
npx prisma generate
npx prisma db push
```

This will create the necessary tables in your database.

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
down/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   └── leaderboard/    # Leaderboard endpoints
│   │   ├── game/               # Game page
│   │   └── layout.tsx
│   ├── components/
│   │   └── game/
│   │       └── GameCanvas.tsx  # Phaser wrapper
│   ├── game/                   # Phaser game logic
│   │   ├── config.ts           # Game configuration
│   │   ├── index.ts            # Game initialization
│   │   ├── scenes/             # Game scenes
│   │   │   ├── InstructionsScene.ts
│   │   │   ├── MainMenuScene.ts
│   │   │   ├── TutorialRoom1Scene.ts
│   │   │   ├── TutorialRoom2Scene.ts
│   │   │   ├── TutorialRoom3Scene.ts
│   │   │   └── TestLevelScene.ts
│   │   └── entities/
│   │       └── Player.ts       # Player character
│   ├── lib/
│   │   ├── db.ts               # Prisma client
│   │   └── validations.ts      # Zod schemas
│   └── types/
│       ├── game.ts             # Game types
│       └── api.ts              # API types
├── prisma/
│   └── schema.prisma           # Database schema
└── public/
    └── assets/                 # Game assets (to be added)
```

## Current Implementation Status

### ✅ Completed
- Next.js + TypeScript setup
- Phaser 3 integration
- Basic scene flow (Instructions → Menu → Tutorials → Test Level)
- Player movement controls (WASD/Arrows/Space)
- Prisma ORM setup
- Leaderboard API endpoints
- Basic platform physics

### 🚧 In Progress / To Do
- Obstacle entities (Red Spikes, Blue Surfaces, Time Crystals)
- Enemy entities (Ground Enemy, Flying Enemy)
- Health system with damage and invulnerability
- Timer system with pause functionality
- Score calculation
- Leaderboard UI page
- Options/Settings page
- Game assets (sprites, audio)
- Level design for tutorial rooms

## Development Workflow

### Adding New Scenes

1. Create scene file in `src/game/scenes/`
2. Import and add to `src/game/config.ts`
3. Implement `create()` and `update()` methods

### Adding New Entities

1. Create entity class in `src/game/entities/`
2. Implement constructor and update logic
3. Use in scenes via instantiation

### Database Changes

After modifying `prisma/schema.prisma`:

```bash
npx prisma generate
npx prisma db push
```

## Testing the Game

1. Start the dev server: `pnpm dev`
2. Navigate to `http://localhost:3000`
3. Enter your player name
4. Click "Play" to start the tutorial
5. Use WASD/Arrow keys to move and jump
6. Progress through tutorial rooms to the test level

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables (DATABASE_URL)
4. Deploy

### Database Providers

Choose one:
- **Supabase**: Free tier with PostgreSQL
- **Railway**: Easy PostgreSQL hosting
- **Neon**: Serverless PostgreSQL
- **Vercel Postgres**: Integrated with Vercel

## Troubleshooting

### Phaser not loading
- Ensure you're using `dynamic` import with `ssr: false` in Next.js
- Check browser console for errors

### Database connection issues
- Verify DATABASE_URL in `.env.local`
- Ensure PostgreSQL is running
- Run `npx prisma db push` to sync schema

### TypeScript errors
- Run `pnpm install` to ensure all types are installed
- Check `tsconfig.json` paths configuration

## Next Steps

1. Implement obstacle entities (Spikes, Blue Surfaces, Crystals)
2. Add enemy entities with patrol behavior
3. Implement health and damage system
4. Create timer system with pause functionality
5. Design and build tutorial room layouts
6. Add game assets (sprites, sounds)
7. Build leaderboard UI page
8. Implement options/settings menu

## Resources

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Game Flow Specification](.kiro/steering/game-flow-and-mechanics.md)
