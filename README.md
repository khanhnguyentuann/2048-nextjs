# 2048 Puzzle Fusion - Next.js Edition

A modern, responsive implementation of the classic 2048 puzzle game built with Next.js, TypeScript, and Tailwind CSS.

## 🎮 Game Features

- **Classic 2048 Gameplay**: Combine tiles with the same number to reach 2048
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Touch Support**: Swipe gestures for mobile gameplay
- **Keyboard Controls**: Arrow keys and WASD support
- **Score Tracking**: Real-time score updates
- **New Game Function**: Reset and start fresh anytime
- **Game Over Detection**: Automatic detection when no moves are possible
- **Smooth Animations**: CSS transitions for tile movements

## 🚀 Technology Stack

- **Next.js 15.4.1** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern state management
- **ESLint** - Code linting and formatting

## 🎯 Controls

### Desktop
- **Arrow Keys**: Move tiles in any direction
- **WASD Keys**: Alternative movement controls
- **New Game Button**: Reset the game

### Mobile
- **Swipe Gestures**: Swipe in any direction to move tiles
- **Touch Controls**: Tap the New Game button to reset

## 🏗️ Project Structure

```
2048-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Main game page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   └── GameBoard.tsx       # Game board component
│   └── lib/
│       └── gameLogic.ts        # Core game logic
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/khanhnguyentuann/2048-nextjs.git
   cd 2048-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Game Logic

### Core Components

- **GameState Interface**: Manages game state (cells, score)
- **Game Logic Functions**:
  - `initializeGame()` - Initialize new game
  - `makeMove()` - Process player moves
  - `isGameOver()` - Check for game end conditions
  - `generateRandomTile()` - Add new tiles after moves

### Movement Algorithm

1. **Slide**: Move all tiles in the specified direction
2. **Merge**: Combine adjacent tiles with the same value
3. **Score**: Add merged tile values to the score
4. **Generate**: Add a new random tile (2 or 4)

## 🎯 Game Rules

1. Use arrow keys or swipe to move tiles
2. When two tiles with the same number touch, they merge into one
3. After every move, a new tile appears randomly
4. The goal is to create a tile with the number 2048
5. The game ends when no more moves are possible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Enjoy the game and happy coding! 🎯**
