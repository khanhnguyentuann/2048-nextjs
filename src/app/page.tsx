'use client';

import { useState, useEffect, useCallback } from 'react';
import GameBoard from '@/components/GameBoard';
import { GameState, initializeGame, makeMove, isGameOver } from '@/lib/gameLogic';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameOverState, setGameOverState] = useState(false);

  // Initialize game on component mount
  useEffect(() => {
    setGameState(initializeGame());
  }, []);

  const handleMove = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (!gameState || gameOverState) return;

    const newState = makeMove(gameState, direction);
    if (newState) {
      setGameState(newState);

      // Check for game over after a short delay
      setTimeout(() => {
        if (isGameOver(newState.cells)) {
          setGameOverState(true);
          setTimeout(() => {
            if (confirm('Game Over! Would you like to play again?')) {
              setGameState(initializeGame());
              setGameOverState(false);
            }
          }, 100);
        }
      }, 200);
    }
  }, [gameState, gameOverState]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        event.preventDefault();
        handleMove('up');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        event.preventDefault();
        handleMove('down');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        event.preventDefault();
        handleMove('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        event.preventDefault();
        handleMove('right');
        break;
    }
  }, [handleMove]);

  const resetGame = () => {
    setGameState(initializeGame());
    setGameOverState(false);
  };

  // Add keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">2048</h1>
        <p className="text-gray-600 mb-4">
          Use arrow keys or WASD to move tiles. Combine tiles with the same number to reach 2048!
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="text-lg font-semibold">
            Score: <span className="text-blue-600">{gameState.score}</span>
          </div>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            New Game
          </button>
        </div>
      </div>

      <GameBoard cells={gameState.cells} />

      {gameOverState && (
        <div className="mt-4 text-center">
          <div className="text-xl font-bold text-red-600">Game Over!</div>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500 max-w-md">
        <p className="mb-2">
          <strong>Desktop:</strong> Use arrow keys or WASD to move
        </p>
        <p>
          <strong>Mobile:</strong> Swipe in any direction
        </p>
      </div>
    </div>
  );
}
