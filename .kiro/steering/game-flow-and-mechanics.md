---
inclusion: always
---

# DOWN - Game Flow & Mechanics Specification

## Game Objective
Reach the lowest point of each level as fast as possible. Timer-based scoring system.

---

## 🎮 User Flow

```
Game Launch
    ↓
Instructions Room (Name Entry)
    ↓
Main Menu
    ├─→ Play → Tutorial Room 1
    ├─→ Leaderboards → View Scores
    └─→ Options → Settings
         
Tutorial Flow:
Room 1 (Movement) → Room 2 (Obstacles) → Room 3 (Enemies) → Test Level
```

---

## 📋 Scene Breakdown

### 1. Instructions Room (Startup Scene)
**Scene ID**: `InstructionsScene`

**Purpose**: Player name entry and game introduction

**Visual Elements**:
- Black background
- Centered prompt: "Enter Player Name"
- Input field for player name
- After input: Large centered title "DOWN"
- Three menu buttons:
  - Play
  - Leaderboards
  - Options

**Behavior**:
- Player MUST enter a name before proceeding
- Name is stored globally for leaderboard submission
- After name entry, menu options become available

**Transitions**:
- Play → `TutorialRoom1Scene`
- Leaderboards → `LeaderboardScene`
- Options → `OptionsScene`

---

### 2. Main Menu Scene
**Scene ID**: `MainMenuScene`

**Visual Elements**:
- Title: "DOWN"
- Player name display (top-right corner)
- Three menu options:
  - Play
  - Leaderboards
  - Options

**Menu Actions**:
- **Play**: Starts tutorial gameplay (Phase 1)
- **Leaderboards**: Opens leaderboard UI (view-only)
- **Options**: Opens settings (volume, controls, etc.)

---

### 3. Tutorial Room 1: Movement Tutorial
**Scene ID**: `TutorialRoom1Scene`

**Objective**: Teach basic movement controls

**Room Layout**:
- Single large platform positioned in the middle of the screen
- Tutorial text displays at the top
- Exit portal/trigger on the right side

**Controls Taught**:

| Action | Keys | Behavior |
|--------|------|----------|
| Jump | `W` or `↑` or `Space` | Single press to jump |
| Move Left | `A` or `←` | Move character left |
| Move Right | `D` or `→` | Move character right |
| Drop / Fast Fall | `S` or `↓` or `Double Space` | Increases fall speed / forces drop through platforms |

**Tutorial Text**:
```
"Welcome to DOWN!"
"Use W/↑/Space to JUMP"
"Use A/← and D/→ to MOVE"
"Use S/↓/Double Space to DROP FASTER"
"Practice these controls, then move right to continue"
```

**Transition**:
- Player reaches right edge → `TutorialRoom2Scene`

---

### 4. Tutorial Room 2: Obstacles & Interactables
**Scene ID**: `TutorialRoom2Scene`

**Objective**: Teach environmental hazards and collectibles

**Room Layout**:
- Multiple platforms with obstacles placed strategically
- Each obstacle type has a dedicated section with tutorial text
- Exit portal at the end

**Obstacles Taught**:

#### Red Spikes
**Variants**: Single / Double / Triple
**Behavior**: Damages player on contact
**Damage**: 1 hit point per spike contact
**Visual**: Red triangular spikes on platforms

**Tutorial Text**:
```
"RED SPIKES are dangerous!"
"Avoid touching them or take damage"
"Larger spike formations = more damage"
```

#### Blue Walls / Platforms
**Behavior**: Reduces player movement speed when touching/moving through
**Speed Reduction**: 50% of normal speed
**Visual**: Blue semi-transparent surfaces

**Tutorial Text**:
```
"BLUE SURFACES slow you down"
"Move through them carefully"
"Plan your route to minimize contact"
```

#### Green Time Crystals
**Variants**: Small / Medium / Large
**Behavior**: Pauses the level timer for a fixed duration
**Duration**: 
- Small: 2 seconds
- Medium: 5 seconds
- Large: 10 seconds
**Visual**: Green glowing crystals (size varies)

**Tutorial Text**:
```
"GREEN TIME CRYSTALS pause the timer!"
"Collect them to improve your score"
"Larger crystals = longer pause duration"
```

**Transition**:
- Player reaches end → `TutorialRoom3Scene`

---

### 5. Tutorial Room 3: Enemy Tutorial
**Scene ID**: `TutorialRoom3Scene`

**Objective**: Teach enemy types and combat rules

**Room Layout**:
- Platforms with enemy spawn points
- Ground enemies patrol horizontally
- Flying enemies move in patterns
- Long upward platform section at the end
- Portal/trigger at the top leading to test level

**Enemy Types**:

#### Ground Enemy
**Behavior**: 
- Patrols horizontally on platforms
- Turns around at platform edges
- Moves at constant speed
**Visual**: Red creature walking on ground
**Damage**: 1 hit point on collision

#### Flying Enemy
**Behavior**:
- Flies in predetermined patterns (horizontal, vertical, or circular)
- Does not respect platform collision
- Moves at constant speed
**Visual**: Red flying creature
**Damage**: 1 hit point on collision

**Combat Rules**:
- Player takes damage when colliding with ANY enemy
- No player attack mechanics (evasion only)
- Damage reduces player health
- Health system: 3 hit points (configurable)

**Tutorial Text**:
```
"ENEMIES will damage you on contact!"
"GROUND ENEMIES patrol platforms"
"FLYING ENEMIES move in patterns"
"Avoid them or lose health"
"You have 3 hit points - don't waste them!"
```

**Transition Section**:
- Long upward platform climb (tests jump + movement)
- Portal/trigger at top → `TestLevelScene`

---

### 6. Test Level
**Scene ID**: `TestLevelScene`

**Objective**: Apply all learned mechanics in a complete level

**Level Design Requirements**:
- Vertical descent layout (going DOWN)
- Multiple paths with varying difficulty
- Includes ALL tutorial elements:
  - Movement challenges (jumps, drops, fast falls)
  - Red spikes (various formations)
  - Blue slow surfaces
  - Green time crystals (strategic placement)
  - Ground enemies
  - Flying enemies
- Clear goal: Reach the lowest point
- Timer starts immediately
- Timer pauses when collecting time crystals

**Win Condition**:
- Player reaches the bottom platform/trigger
- Timer stops
- Score calculated based on time
- Transition to score submission screen

**Lose Condition**:
- Player health reaches 0
- Game over screen with retry option

---

## 🎯 Gameplay Rules

### Movement System
```typescript
// Control mapping
const CONTROLS = {
  jump: ['W', 'ArrowUp', 'Space'],
  moveLeft: ['A', 'ArrowLeft'],
  moveRight: ['D', 'ArrowRight'],
  drop: ['S', 'ArrowDown', 'DoubleSpace']
};

// Movement parameters
const MOVEMENT = {
  walkSpeed: 200,        // pixels per second
  jumpVelocity: -400,    // negative = upward
  gravity: 800,          // pixels per second squared
  dropMultiplier: 2.5,   // fast fall speed multiplier
};
```

### Damage System
```typescript
// Player health
const PLAYER_HEALTH = {
  max: 3,
  current: 3,
  invulnerabilityTime: 1000, // ms after taking damage
};

// Damage sources
const DAMAGE_VALUES = {
  redSpikeSingle: 1,
  redSpikeDouble: 1,  // per spike touched
  redSpikeTriple: 1,  // per spike touched
  groundEnemy: 1,
  flyingEnemy: 1,
};
```

### Timer System
```typescript
// Timer behavior
const TIMER = {
  startOnLevelLoad: true,
  pauseOnCrystalCollect: true,
  displayFormat: 'MM:SS.mmm',
};

// Time crystal pause durations (milliseconds)
const CRYSTAL_PAUSE_DURATION = {
  small: 2000,
  medium: 5000,
  large: 10000,
};
```

### Obstacle Behavior
```typescript
// Blue surface speed reduction
const BLUE_SURFACE = {
  speedMultiplier: 0.5,  // 50% of normal speed
  affectsHorizontalOnly: true,
};

// Spike collision
const SPIKE_COLLISION = {
  damageOnTouch: true,
  respectInvulnerability: true,
};
```

### Enemy Behavior
```typescript
// Ground enemy
const GROUND_ENEMY = {
  speed: 100,              // pixels per second
  patrolDistance: 200,     // pixels
  turnAtEdge: true,
  detectPlayer: false,     // no AI tracking (yet)
};

// Flying enemy
const FLYING_ENEMY = {
  speed: 120,              // pixels per second
  movementPattern: 'horizontal' | 'vertical' | 'circular',
  ignoresPlatforms: true,
  detectPlayer: false,     // no AI tracking (yet)
};
```

---

## 🔧 Implementation Notes

### Scene Management
```typescript
// Scene transition flow
InstructionsScene → MainMenuScene → TutorialRoom1Scene → 
TutorialRoom2Scene → TutorialRoom3Scene → TestLevelScene → 
ScoreSubmissionScene → LeaderboardScene
```

### Data Persistence
```typescript
// Store globally across scenes
interface GameState {
  playerName: string;
  currentHealth: number;
  currentTime: number;
  levelProgress: number;
  highScore: number;
}
```

### Asset Requirements
```
public/assets/
├── sprites/
│   ├── player.png           # Player character sprite sheet
│   ├── ground-enemy.png     # Ground enemy sprite sheet
│   ├── flying-enemy.png     # Flying enemy sprite sheet
│   ├── spike-single.png     # Single spike
│   ├── spike-double.png     # Double spike
│   ├── spike-triple.png     # Triple spike
│   ├── blue-surface.png     # Blue slow surface
│   ├── crystal-small.png    # Small time crystal
│   ├── crystal-medium.png   # Medium time crystal
│   └── crystal-large.png    # Large time crystal
├── audio/
│   ├── jump.mp3
│   ├── damage.mp3
│   ├── crystal-collect.mp3
│   └── bgm-menu.mp3
└── maps/
    ├── tutorial-room-1.json
    ├── tutorial-room-2.json
    ├── tutorial-room-3.json
    └── test-level.json
```

---

## 🚀 Future-Proofing

### Extensibility Points

#### Obstacles / Interactables (Extensible)
Current: Red Spikes, Blue Surfaces, Green Time Crystals

**Future additions**:
- Yellow bounce pads (launch player upward)
- Purple portals (teleportation)
- Orange fire hazards (continuous damage)
- White ice platforms (slippery movement)
- Black holes (gravity wells)

**Implementation pattern**:
```typescript
interface Obstacle {
  type: string;
  behavior: (player: Player) => void;
  variants?: string[];
}
```

#### Enemies (Extensible)
Current: Ground Enemy, Flying Enemy

**Future additions**:
- Ranged enemies (projectile attacks)
- Boss enemies (multi-phase fights)
- Stationary turrets
- Chasing enemies (AI tracking)

**Implementation pattern**:
```typescript
interface Enemy {
  type: string;
  movementPattern: MovementPattern;
  attackPattern?: AttackPattern;
  health?: number;
}
```

#### Power-ups (Future)
- Double jump ability
- Speed boost
- Shield (temporary invulnerability)
- Time slow (slow-motion effect)

#### Level Mechanics (Future)
- Moving platforms
- Destructible walls
- Switches and doors
- Weather effects (wind, rain)

---

## 📊 Scoring System

### Score Calculation
```typescript
// Final score based on time
const calculateScore = (timeInMs: number, health: number): number => {
  const baseScore = 10000;
  const timePenalty = timeInMs / 100;  // 1 point per 100ms
  const healthBonus = health * 500;
  
  return Math.max(0, baseScore - timePenalty + healthBonus);
};
```

### Leaderboard Entry
```typescript
interface LeaderboardEntry {
  playerName: string;
  score: number;
  time: number;        // milliseconds
  healthRemaining: number;
  timestamp: Date;
}
```

---

## 🎨 Visual Style Guide

### Color Palette
- **Background**: Black (#000000)
- **Platforms**: Dark gray (#2a2a2a)
- **Player**: White/Light blue (#ffffff / #4a9eff)
- **Danger (Spikes/Enemies)**: Red (#ff4444)
- **Slow Surface**: Blue (#4444ff)
- **Time Crystal**: Green (#44ff44)
- **UI Text**: White (#ffffff)
- **UI Accent**: Cyan (#00ffff)

### Typography
- **Title Font**: Large, bold, sans-serif
- **Tutorial Text**: Medium, readable, sans-serif
- **Timer Display**: Monospace font for clarity

---

## 🐛 Edge Cases & Error Handling

### Player Input
- Handle simultaneous key presses (e.g., left + right = no movement)
- Prevent double jump (unless power-up acquired)
- Queue jump input if pressed just before landing (coyote time)

### Collision Detection
- Use invulnerability frames after damage
- Prevent getting stuck in walls
- Handle fast-moving objects (continuous collision detection)

### Timer Edge Cases
- Pause timer during scene transitions
- Handle multiple crystal collections (queue pause durations)
- Cap maximum time to prevent overflow

### Health Edge Cases
- Prevent health from going negative
- Handle death during invulnerability frames
- Reset health on level restart

---

## 📝 Development Phases

### Phase 1: Tutorial & Core Mechanics (Current)
- ✅ Instructions Room with name entry
- ✅ Main Menu
- ✅ Tutorial Rooms 1-3
- ✅ Test Level
- ✅ Basic movement, obstacles, enemies
- ✅ Timer system
- ✅ Health system

### Phase 2: Leaderboard Integration
- API routes for score submission
- Database schema for leaderboard
- Leaderboard UI with filtering/sorting
- Score validation and anti-cheat

### Phase 3: Additional Levels
- Level selection screen
- 5-10 unique levels with increasing difficulty
- Level progression system
- Unlock mechanics

### Phase 4: Polish & Features
- Sound effects and music
- Particle effects
- Screen shake on damage
- Smooth camera follow
- Options menu (volume, controls, graphics)

### Phase 5: Advanced Mechanics
- Power-ups system
- Additional enemy types
- Boss fights
- Achievements system

---

## 🔑 Key Implementation Files

### Phaser Scenes
```
src/game/scenes/
├── InstructionsScene.ts      # Name entry + initial menu
├── MainMenuScene.ts           # Main menu navigation
├── TutorialRoom1Scene.ts      # Movement tutorial
├── TutorialRoom2Scene.ts      # Obstacles tutorial
├── TutorialRoom3Scene.ts      # Enemy tutorial
├── TestLevelScene.ts          # First playable level
├── LeaderboardScene.ts        # Leaderboard display
├── OptionsScene.ts            # Settings menu
└── GameOverScene.ts           # Death/completion screen
```

### Game Entities
```
src/game/entities/
├── Player.ts                  # Player character with all controls
├── GroundEnemy.ts             # Patrolling ground enemy
├── FlyingEnemy.ts             # Flying enemy with patterns
├── Spike.ts                   # Red spike obstacle
├── BlueSurface.ts             # Speed-reducing surface
└── TimeCrystal.ts             # Timer-pausing collectible
```

### Game Systems
```
src/game/utils/
├── HealthSystem.ts            # Health and damage management
├── TimerSystem.ts             # Level timer with pause support
├── ScoreCalculator.ts         # Score calculation logic
└── InputManager.ts            # Centralized input handling
```

---

This specification serves as the single source of truth for the DOWN platformer game implementation. All mechanics, flows, and systems described here should be referenced during development.
