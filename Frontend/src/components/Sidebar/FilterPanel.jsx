import React, { useState } from "react";

export default function FilterPanel() {
  const [selectedDate, setSelectedDate] = useState("Today");

  const dateOptions = [
    "Today",
    "+1 Day",
    "+2 Days",
    "+3 Days",
    "+4 Days",
    "+5 Days",
  ];

  return (
    <div className="w-full flex flex-col gap-6">
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
          <option>Central</option>
          <option>North</option>
          <option>South</option>
          <option>East</option>
          <option>West</option>
        </select>
      </div>

      {/* Season */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Select Season
        </label>

        <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          <option>Monsoon</option>
          <option>Summer</option>
          <option>Winter</option>
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
