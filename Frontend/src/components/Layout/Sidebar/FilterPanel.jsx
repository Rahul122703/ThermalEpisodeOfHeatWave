import React from "react";

// Helper function to format date as "Mar 11" style
function formatDate(date) {
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export default function FilterPanel() {
  // Generate array of 8 days starting from today
  const today = new Date();
  const dates = Array.from({ length: 8 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  // Lists for regions and seasons
  const regions = [
    "North",
    "West",
    "Central",
    "South",
    "Northeast",
    "Southwest",
  ];
  const seasons = ["Premonsoon", "Monsoon", "Postmonsoon", "Winter"];

  return (
    <div className="sidebar p-4 bg-gray-100 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-3">Max Temperature</h3>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Region</label>
        <select className="w-full p-2 border rounded">
          {regions.map((region, idx) => (
            <option key={idx}>{region}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Season</label>
        <select className="w-full p-2 border rounded">
          {seasons.map((season, idx) => (
            <option key={idx}>{season}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Date</label>
        <div className="date-buttons flex flex-wrap gap-2">
          {dates.map((date, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded border ${
                idx === 0 ? "bg-blue-500 text-white" : "bg-white text-gray-800"
              }`}
            >
              {idx === 0 ? "Today" : formatDate(date)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
