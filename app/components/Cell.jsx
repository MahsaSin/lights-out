"use client";

export default function Cell({ isOn, onClick }) {
  return (
    <button
      className={`cell ${isOn ? "on" : "off"}`}
      onClick={onClick}
      aria-pressed={isOn}
      aria-label={isOn ? "Turn off" : "Turn on"}
    >
      {isOn ? "●" : "○"}
    </button>
  );
}
