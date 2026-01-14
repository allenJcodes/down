# Project Structure

## Root Directory
```
├── .env.local              # Environment variables (DATABASE_URL)
├── .env.example            # Environment template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js + Phaser webpack config
├── tailwind.config.js      # Tailwind CSS configuration
├── prisma/                 # Database schema and migrations
└── src/                    # Application source code
```

## Source Directory (`src/`)

### Next.js App Router (`src/app/`)
- **App Router structure**: Next.js 16 file-based routing
- `layout.tsx`: Root layout component
- `page.tsx`: Home/landing page
- `globals.css`: Global styles and Tailwind imports
- `game/page.tsx`: Game page with Phaser canvas
- `api/`: Server-side API routes
  - `leaderboard/route.ts`: GET/POST leaderboard entries

### React Components (`src/components/`)
- `ui/`: Reusable UI components (buttons, cards, etc.)
- `game/`: Game-specific React components
  - `GameCanvas.tsx`: Phaser game wrapper component

### Phaser Game Logic (`src/game/`)
- `index.ts`: Game initialization and setup
- `config.ts`: Phaser configuration (scenes, physics, dimensions)
- `scenes/`: Phaser scene classes
  - `InstructionsScene.ts`: Name entry and initial menu
  - `MainMenuScene.ts`: Main menu navigation
  - `TutorialRoom1Scene.ts`: Movement tutorial
  - `TutorialRoom2Scene.ts`: Obstacles tutorial
  - `TutorialRoom3Scene.ts`: Enemy tutorial
  - `TestLevelScene.ts`: First playable level
- `entities/`: Game entity classes
  - `Player.ts`: Player character with movement controls
  - Future: `GroundEnemy.ts`, `FlyingEnemy.ts`, `Spike.ts`, etc.

### Library Code (`src/lib/`)
- `db.ts`: Prisma client singleton setup
- `validations.ts`: Zod schemas for API validation
- Future: `ratelimit.ts` for rate limiting

### TypeScript Types (`src/types/`)
- `game.ts`: Game-related type definitions
- `api.ts`: API request/response types

## Public Assets (`public/`)
```
public/
└── assets/
    ├── sprites/     # Game sprites and spritesheets (.gitkeep placeholder)
    ├── audio/       # Sound effects and music (.gitkeep placeholder)
    └── maps/        # Level data and tilemaps (.gitkeep placeholder)
```

## Database (`prisma/`)
- `schema.prisma`: Database schema definition
- `migrations/`: Auto-generated migration files

## Naming Conventions
- **Files**: PascalCase for components/classes (`Player.ts`, `GameCanvas.tsx`)
- **Files**: camelCase for utilities (`db.ts`, `validations.ts`)
- **Folders**: kebab-case for routes (`api/leaderboard/`)
- **React Components**: PascalCase with `.tsx` extension
- **Phaser Classes**: PascalCase with `.ts` extension
- **Scene naming**: `<Name>Scene` pattern (e.g., `MainMenuScene`)

## Import Patterns
- Use `@/` path alias for imports from `src/`
- Example: `import { prisma } from '@/lib/db'`
- Phaser imports: `import Phaser from 'phaser'`

## Scene Flow
```
InstructionsScene → MainMenuScene → TutorialRoom1Scene → 
TutorialRoom2Scene → TutorialRoom3Scene → TestLevelScene
```

## API Routes
- `/api/leaderboard`: GET (fetch scores), POST (submit score)
- Future: `/api/leaderboard/[id]` for individual operations

## Key Architectural Patterns
- **Next.js App Router**: File-based routing in `src/app/`
- **Phaser Scene System**: Each game screen is a separate scene class
- **Prisma ORM**: Type-safe database access with generated client
- **Zod Validation**: Runtime validation for API inputs
- **React-Phaser Integration**: Phaser game wrapped in React component
