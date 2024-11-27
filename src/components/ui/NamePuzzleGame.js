
import React, { useState, useRef } from 'react';
import { Undo2, Lock, Unlock } from 'lucide-react';

const NamePuzzleGame = () => {
  const gameGridRef = useRef(null);
  const [playerName, setPlayerName] = useState({});
  const [bio, setBio] = useState('');
  const [showBioForm, setShowBioForm] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [gridDimensions, setGridDimensions] = useState({
    columns: 10,
    rows: 8,
    cellSize: 40
  });

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleDragStart = (e, letter) => {
    if (isLocked) return;
    e.dataTransfer.setData('text', letter);
  };

  const handleDrop = (e, index) => {
    if (isLocked) return;
    e.preventDefault();
    const letter = e.dataTransfer.getData('text');
    if (!playerName[index]) {
      setPlayerName(prev => ({ ...prev, [index]: letter }));
    }
  };

  const toggleLock = () => {
    setIsLocked(prev => !prev);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Name Puzzle Game</h1>
        <button onClick={toggleLock}>
          {isLocked ? <Unlock /> : <Lock />} {isLocked ? 'Unlock' : 'Lock'}
        </button>
      </div>
      <div className="game-grid" ref={gameGridRef} style={{
        gridTemplateColumns: `repeat(${gridDimensions.columns}, ${gridDimensions.cellSize}px)`,
        gridTemplateRows: `repeat(${gridDimensions.rows}, ${gridDimensions.cellSize}px)`
      }}>
        {Array.from({ length: gridDimensions.columns * gridDimensions.rows }).map((_, idx) => (
          <div
            key={idx}
            onDrop={(e) => handleDrop(e, idx)}
            onDragOver={(e) => e.preventDefault()}
            className="grid-cell"
          >
            {playerName[idx]}
          </div>
        ))}
      </div>
      <div className="letters-container">
        {letters.map((letter, idx) => (
          <div
            key={idx}
            draggable={!isLocked}
            onDragStart={(e) => handleDragStart(e, letter)}
            className="letter"
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NamePuzzleGame;
