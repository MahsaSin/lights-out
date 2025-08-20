"use client";

import { useState, useEffect } from "react";
import Board from "./components/Board";
import { neighbors, toggle, isSolved, randomGrid } from "./lib/lights";

export default function Page() {
  // Start with a deterministic board so SSR === CSR.
  const [history, setHistory] = useState([Array(9).fill(false)]);
  const [step, setStep] = useState(0);

  // After mount, swap in a random puzzle to avoid hydration mismatch.
  useEffect(() => {
    setHistory([randomGrid()]);
    setStep(0);
  }, []);

  const grid = history[step];
  const won = isSolved(grid);

  function handleToggle(i) {
    if (won) return; // lock after win
    const nextGrid = toggle(grid, neighbors(i));
    const nextHistory = [...history.slice(0, step + 1), nextGrid];
    setHistory(nextHistory);
    setStep(nextHistory.length - 1);
  }

  function jump(to) {
    setStep(to);
  }

  function resetRandom() {
    setHistory([randomGrid()]);
    setStep(0);
  }

  function startAllOff() {
    setHistory([Array(9).fill(false)]);
    setStep(0);
  }

  return (
    <main className="app">
      <h1>Lights Out</h1>

      <div className="status">
        {won ? "🎉 You solved it!" : "Goal: turn all lights off (○)."}
      </div>

      <Board grid={grid} onToggle={handleToggle} />

      <div className="controls">
        <button onClick={resetRandom}>New random puzzle</button>
        <button onClick={startAllOff}>Start from all off</button>
        <button onClick={() => jump(Math.max(0, step - 1))} disabled={step === 0}>
          Undo
        </button>
        <button
          onClick={() => jump(Math.min(history.length - 1, step + 1))}
          disabled={step === history.length - 1}
        >
          Redo
        </button>
      </div>

      <div className="status">Moves: {step}</div>

      <ol className="moves">
        {history.map((_, move) => (
          <li key={move}>
            {move === 0 ? "Start" : `Move #${move}`}
            <button
              onClick={() => jump(move)}
              disabled={move === step}
              aria-current={move === step}
            >
              {move === step ? "Current" : "Go to"}
            </button>
          </li>
        ))}
      </ol>
    </main>
  );
}
