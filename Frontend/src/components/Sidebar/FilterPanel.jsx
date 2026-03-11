import React, { useState } from "react";

// Helper function to format date as "Mar 11"
function formatDate(date) {
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export default function FilterPanel() {
  const [selectedDate, setSelectedDate] = useState("Today");

  const today = new Date();
  const todayLabel = formatDate(today);

  // Generate dates dynamically: Today + next 7 days
  const dateOptions = Array.from({ length: 8 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return i === 0 ? todayLabel : formatDate(d);
  });

  // Full lists for regions and seasons
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
    <div className="w-full h-full flex flex-col gap-6 p-4 bg-gray-50 rounded-md shadow-md">
      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Max Temperature</h3>
        <p className="text-sm text-gray-500 mt-1">
          Adjust filters to refine forecast results
        </p>
      </div>

      {/* Region */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Select Region
        </label>
        <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          {regions.map((region) => (
            <option key={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Season */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Select Season
        </label>
        <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          {seasons.map((season) => (
            <option key={season}>{season}</option>
          ))}
        </select>
      </div>

      {/* Date Forecast */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-700">
          Select Forecast Date
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
          {dateOptions.map((date) => {
            const active = selectedDate === date;
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`text-sm font-medium rounded-lg px-3 py-2 transition-all duration-200 border
                  ${
                    active
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }
                `}
              >
                {date}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
