export interface GameState {
  cells: number[][];
  score: number;
}

export interface CellColor {
  value: number;
  color: string;
  background: string;
}

export const CELL_COLORS: CellColor[] = [
  { value: 0, color: "#776E65", background: "#cdc1b4" },
  { value: 2, color: "#776E65", background: "#eee4da" },
  { value: 4, color: "#776E65", background: "#ede0c8" },
  { value: 8, color: "#FFF", background: "#f2b179" },
  { value: 16, color: "#FFF", background: "#f59563" },
  { value: 32, color: "#FFF", background: "#f67c5f" },
  { value: 64, color: "#FFF", background: "#f65e3b" },
  { value: 128, color: "#FFF", background: "#edcf72" },
  { value: 256, color: "#FFF", background: "#edcc61" },
  { value: 512, color: "#FFF", background: "#edc850" },
  { value: 1024, color: "#FFF", background: "#edc53f" },
  { value: 2048, color: "#FFF", background: "#edc22e" },
];

const GRID_SIZE = 4;

export function createEmptyGrid(): number[][] {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

export function generateRandomTile(cells: number[][]): number[][] {
  const emptyCells: { x: number; y: number }[] = [];

  // Find all empty cells
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (cells[y][x] === 0) {
        emptyCells.push({ x, y });
      }
    }
  }

  if (emptyCells.length === 0) return cells;

  // Choose random empty cell
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { x, y } = emptyCells[randomIndex];

  // Create new grid with new tile
  const newCells = cells.map(row => [...row]);
  newCells[y][x] = Math.random() >= 0.9 ? 4 : 2;

  return newCells;
}

export function initializeGame(): GameState {
  let cells = createEmptyGrid();

  // Add initial tiles
  cells = generateRandomTile(cells);
  cells = generateRandomTile(cells);
  cells = generateRandomTile(cells);

  return {
    cells,
    score: 0
  };
}

function slide(array: number[]): { newArray: number[]; scoreGained: number } {
  // Filter out zeros
  let filtered = array.filter(x => x !== 0);
  let scoreGained = 0;

  // Merge adjacent equal numbers
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      scoreGained += filtered[i];
      filtered[i + 1] = 0;
    }
  }

  // Filter out zeros again
  filtered = filtered.filter(x => x !== 0);

  // Pad with zeros to maintain array length
  while (filtered.length < GRID_SIZE) {
    filtered.push(0);
  }

  return { newArray: filtered, scoreGained };
}

function slideLeft(cells: number[][]): { newCells: number[][]; scoreGained: number; changed: boolean } {
  let totalScore = 0;
  let changed = false;
  const newCells = cells.map((row) => {
    const oldRow = [...row];
    const { newArray, scoreGained } = slide(row);
    totalScore += scoreGained;

    // Check if row changed
    if (newArray.join(',') !== oldRow.join(',')) {
      changed = true;
    }

    return newArray;
  });

  return { newCells, scoreGained: totalScore, changed };
}

function transpose(cells: number[][]): number[][] {
  const newCells = createEmptyGrid();
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      newCells[x][y] = cells[y][x];
    }
  }
  return newCells;
}

function mirror(cells: number[][]): number[][] {
  return cells.map(row => [...row].reverse());
}

export function makeMove(gameState: GameState, direction: 'up' | 'down' | 'left' | 'right'): GameState | null {
  let { cells } = gameState;
  let result;

  switch (direction) {
    case 'left':
      result = slideLeft(cells);
      break;
    case 'right':
      cells = mirror(cells);
      result = slideLeft(cells);
      result.newCells = mirror(result.newCells);
      break;
    case 'up':
      cells = transpose(cells);
      result = slideLeft(cells);
      result.newCells = transpose(result.newCells);
      break;
    case 'down':
      cells = transpose(cells);
      cells = mirror(cells);
      result = slideLeft(cells);
      result.newCells = mirror(result.newCells);
      result.newCells = transpose(result.newCells);
      break;
    default:
      return null;
  }

  if (!result.changed) {
    return null; // No move was made
  }

  // Add new random tile
  const newCells = generateRandomTile(result.newCells);

  return {
    cells: newCells,
    score: gameState.score + result.scoreGained
  };
}

export function isGameOver(cells: number[][]): boolean {
  // Check for empty cells
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (cells[y][x] === 0) return false;
    }
  }

  // Check for possible merges
  for (let y = 0; y < GRID_SIZE - 1; y++) {
    for (let x = 0; x < GRID_SIZE - 1; x++) {
      const current = cells[y][x];
      if (current !== 0 && (current === cells[y + 1][x] || current === cells[y][x + 1])) {
        return false;
      }
    }
  }

  // Check last row for horizontal merges
  for (let x = 0; x < GRID_SIZE - 1; x++) {
    const current = cells[GRID_SIZE - 1][x];
    if (current !== 0 && current === cells[GRID_SIZE - 1][x + 1]) {
      return false;
    }
  }

  // Check last column for vertical merges
  for (let y = 0; y < GRID_SIZE - 1; y++) {
    const current = cells[y][GRID_SIZE - 1];
    if (current !== 0 && current === cells[y + 1][GRID_SIZE - 1]) {
      return false;
    }
  }

  return true;
}

export function getCellColor(value: number): CellColor {
  return CELL_COLORS.find(cell => cell.value === value) || CELL_COLORS[0];
}
