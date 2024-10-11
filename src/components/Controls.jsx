import React from 'react';
import './Controls.css';

const Controls = ({
  onRandomize,
  onSort,
  onStop,
  algorithm,
  setAlgorithm,
  animationSpeed,
  setAnimationSpeed,
  isSorting,
}) => {
  const handleSpeedChange = (e) => {
    setAnimationSpeed(Number(e.target.value));
  };

  return (
    <div className="controls">
      <button onClick={onRandomize} disabled={isSorting}>
        Randomize
      </button>
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        disabled={isSorting}
      >
        <option value="Bubble Sort">Bubble Sort</option>
        <option value="Selection Sort">Selection Sort</option>
        <option value="Insertion Sort">Insertion Sort</option>
        {/* Add more algorithms here */}
      </select>
      <button onClick={onSort} disabled={isSorting}>
        Sort
      </button>
      <button onClick={onStop} disabled={!isSorting}>
        Stop
      </button>
      <div className="slider-container">
        <label htmlFor="speedRange">Speed: </label>
        <input
          type="range"
          id="speedRange"
          min="10"
          max="1000"
          step="10"
          value={animationSpeed}
          onChange={handleSpeedChange}
          disabled={isSorting}
        />
        <span>{animationSpeed} ms</span>
      </div>
    </div>
  );
};

export default Controls;
