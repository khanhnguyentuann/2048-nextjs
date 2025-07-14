'use client';

import { useState } from 'react';
import { getCellColor } from '@/lib/gameLogic';

interface GameBoardProps {
  cells: number[][];
}

interface TouchStart {
  x: number;
  y: number;
}

export default function GameBoard({ cells }: GameBoardProps) {
  const [touchStart, setTouchStart] = useState<TouchStart | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 50;

    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        const direction = deltaX > 0 ? 'right' : 'left';
        // Dispatch keyboard event to trigger game logic
        const keyCode = direction === 'right' ? 'ArrowRight' : 'ArrowLeft';
        window.dispatchEvent(new KeyboardEvent('keydown', { key: keyCode }));
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        const direction = deltaY > 0 ? 'down' : 'up';
        // Dispatch keyboard event to trigger game logic
        const keyCode = direction === 'down' ? 'ArrowDown' : 'ArrowUp';
        window.dispatchEvent(new KeyboardEvent('keydown', { key: keyCode }));
      }
    }

    setTouchStart(null);
  };

  return (
    <div
      className="inline-block bg-amber-700 p-3 rounded-lg shadow-lg select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid grid-cols-4 gap-2">
        {cells.map((row, y) =>
          row.map((cellValue, x) => {
            const cellColor = getCellColor(cellValue);
            return (
              <div
                key={`${y}-${x}`}
                className="w-20 h-20 flex items-center justify-center rounded-md font-bold text-lg transition-all duration-200 ease-out"
                style={{
                  backgroundColor: cellColor.background,
                  color: cellColor.color,
                }}
              >
                {cellValue === 0 ? '' : cellValue}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
