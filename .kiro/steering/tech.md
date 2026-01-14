# Tech Stack

## Runtime & Package Manager
- **Node.js**: 25.2.1 (local dev) / 20 LTS (recommended for production)
- **pnpm**: 10.22

## Frontend
- **Next.js**: 16.1.x (App Router)
- **React**: 18.3.x
- **TypeScript**: 5.7.x (strict mode enabled)
- **Tailwind CSS**: 3.4.x

## Game Engine
- **Phaser**: 3.90.0 (arcade physics)

## Backend & Database
- **Next.js API Routes**: Server-side API handlers in `/app/api`
- **PostgreSQL**: 18.x
- **Prisma ORM**: 7.2.x

## Validation & Type Safety
- **Zod**: 3.24.x for runtime validation
- **TypeScript**: Compile-time type checking

## Build System
- **Next.js**: Handles bundling, transpilation, and optimization
- **Webpack**: Configured via `next.config.js` for Phaser compatibility

## Common Commands

### Development
```bash
pnpm dev              # Start development server (localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

### Database
```bash
npx prisma generate   # Generate Prisma client
npx prisma db push    # Push schema changes to database
npx prisma migrate dev # Create and apply migration
npx prisma studio     # Open Prisma Studio GUI
```

### Installation
```bash
pnpm install          # Install dependencies
```

## Configuration Files
- `next.config.js`: Next.js configuration (Phaser webpack setup)
- `tsconfig.json`: TypeScript compiler options (strict mode, path aliases)
- `tailwind.config.js`: Tailwind CSS configuration
- `prisma/schema.prisma`: Database schema definition
- `.env.local`: Environment variables (DATABASE_URL, etc.)

## Path Aliases
- `@/*` maps to `./src/*` for cleaner imports

## TypeScript Configuration
- Target: ES2020
- Strict mode enabled
- Module resolution: bundler
- JSX: preserve (handled by Next.js)
