import React from "react";

export default function FilterPanel() {
  return (
    <div className="sidebar">
      <h3>Max Temperature</h3>

      <label>Select Region</label>
      <select>
        <option>Central</option>
        <option>North</option>
        <option>South</option>
      </select>

      <label>Select Season</label>
      <select>
        <option>Monsoon</option>
        <option>Summer</option>
        <option>Winter</option>
      </select>

      <label>Select Date</label>

      <div className="date-buttons">
        <button className="active">Today</button>
        <button>+1 Day</button>
        <button>+2 Days</button>
        <button>+3 Days</button>
        <button>+4 Days</button>
        <button>+5 Days</button>
      </div>
    </div>
  );
}