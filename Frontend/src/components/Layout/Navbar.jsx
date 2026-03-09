import React, { useState } from "react";

import icon from "../../../public/icon.png";
export default function Navbar() {
  const [active, setActive] = useState("Forecast");

  const navItems = ["Forecast", "Accuracy", "About Us"];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md border border-gray-200">
              <img
                src={icon}
                alt="Heatwave Icon"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
                PYRKheatWave
              </h1>

              <p className="text-xs text-gray-500 hidden sm:block">
                Climate Forecast Dashboard
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2 sm:gap-3 bg-gray-100/70 backdrop-blur-sm p-1 rounded-xl w-full md:w-auto overflow-x-auto shadow-inner">
            {navItems.map((item) => {
              const isActive = active === item;

              return (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={`
                  relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                  
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-white hover:text-gray-900"
                  }
                  `}
                >
                  {item}

                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-white rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
