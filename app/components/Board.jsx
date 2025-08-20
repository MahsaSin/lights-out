"use client";

import Cell from "./Cell";

export default function Board({ grid, onToggle }) {
  return (
    <div className="board">
      {grid.map((isOn, i) => (
        <Cell key={i} isOn={isOn} onClick={() => onToggle(i)} />
      ))}
    </div>
  );
}
