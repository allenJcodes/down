# Notes & Reflections

Free-form notes, thoughts, and reflections throughout the DOWN platformer project development.

---

## General Notes

### Development Environment
- Using Next.js 16 with Phaser 3.90
- TypeScript strict mode enabled
- All code follows ES modules (no CommonJS)
- pnpm as package manager
- PostgreSQL + Prisma for database

### Project Status
- Core mechanics: ✅ Complete
- Tutorial system: ✅ Complete
- Test level: ✅ Complete
- Collectibles: ⏳ In progress
- Leaderboard integration: ⏳ Pending
- Assets: ❌ Not started
- Deployment: ⏳ Infrastructure ready

---

## Random Thoughts

### On Game Development
- Game development is more iterative than expected - lots of tweaking values
- Placeholder graphics are liberating - focus on mechanics first
- Tutorial design is harder than it looks - need to teach without boring players
- Physics engines have quirks that require workarounds

### On the Project
- The vertical descent concept is fun and unique
- Timer-based scoring creates natural speedrun potential
- Health system adds risk/reward to route choices
- Tutorial progression feels good - not too long, not too short

---

## Questions to Explore

### Technical Questions
- How to implement smooth particle effects without performance hit?
- Best way to handle sprite animations in Phaser?
- Should we use Tiled for level design or code levels directly?
- How to prevent cheating in leaderboard submissions?

### Design Questions
- How many levels is the right amount?
- Should there be difficulty settings?
- Would power-ups enhance or complicate the core gameplay?
- Is 3 hit points the right amount of health?

---

## Ideas & Experiments

### Gameplay Ideas
- Time attack mode with ghost replays
- Daily challenge levels
- Community level sharing
- Speedrun leaderboards per level
- Hidden shortcuts in levels

### Technical Experiments
- Procedural level generation
- Dynamic difficulty adjustment
- Replay system for sharing runs
- Level editor for players

---

## Memorable Moments

### Development Wins
- First successful jump felt great
- Tutorial flow working end-to-end was satisfying
- Seeing enemies patrol for the first time
- Test level completion screen working perfectly

### Development Struggles
- Fighting with physics velocity caps for hours
- Spike collision triggering multiple times
- Camera scroll affecting UI elements
- Scene transitions not working initially

---

## Quotes & Inspiration

> "Make it work, make it right, make it fast." - Kent Beck

> "A game is a series of interesting choices." - Sid Meier

> "Prototype quickly, iterate constantly." - Game dev wisdom

---

## Miscellaneous

### Useful Commands
```bash
pnpm dev              # Start dev server
npx prisma studio     # Open database GUI
npx prisma db push    # Push schema changes
pnpm build            # Test production build
```

### Keyboard Shortcuts (Game)
- W/↑/Space: Jump
- A/←: Move left
- D/→: Move right
- S/↓: Fast fall

### Color Palette
- Player: #4a9eff (blue)
- Danger: #ff4444 (red)
- Safe/Goal: #44ff44 (green)
- Slow: #4444ff (blue)
- Platform: #2a2a2a (dark gray)
- Background: #000000 (black)

---

**Last Updated**: January 15, 2026
