import React from 'react';
import './BarGraph.css';

const BarGraph = ({ array, colorMap }) => {
  return (
    <div className="bar-container">
      {array.map((value, idx) => {
        const barColor = colorMap[idx] || 'turquoise';
        return (
          <div
            className="bar"
            key={idx}
            style={{
              height: `${value}px`,
              backgroundColor: barColor,
              width: `${Math.floor(800 / array.length)}px`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default BarGraph;
