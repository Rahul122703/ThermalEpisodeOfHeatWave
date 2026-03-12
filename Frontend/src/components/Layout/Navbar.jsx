import React, { useState } from "react";
import icon from "../../../public/icon.png";

const NAV_ITEMS = [
  { id: "forecast", label: "Forecast" },
  { id: "accuracy", label: "Accuracy" },
  { id: "about", label: "About Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Logo + tiny title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
              <img
                src={icon}
                alt="PYRK heat icon"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="leading-tight">
              <div className="text-sm font-semibold gradient-text tracking-tight select-none">
                PYRKheatWave
              </div>
              <div className="text-[11px] text-gray-500 -mt-0.5">
                Climate Dashboard
              </div>
            </div>
          </div>

          {/* Right: compact controls */}
          <div className="flex items-center gap-3">
            {/* subtle pill showing active page (minimal, non-intrusive) */}
            <div className="hidden sm:flex items-center px-3 py-1 rounded-full bg-white/60 border border-gray-200 text-xs text-gray-700 shadow-inner">
              Forecast
            </div>

            {/* Hamburger */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
            >
              <span
                className={`hamburger-line top ${open ? "open" : ""}`}
              ></span>
              <span
                className={`hamburger-line middle ${open ? "open" : ""}`}
              ></span>
              <span
                className={`hamburger-line bottom ${open ? "open" : ""}`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating compact menu (mobile & small desktop) */}
      <div
        className={`pointer-events-auto origin-top-right absolute right-4 top-14 transform transition-all duration-300 ${
          open
            ? "scale-100 opacity-100 visible"
            : "scale-95 opacity-0 invisible"
        }`}
      >
        <div className="min-w-[180px] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg py-2 overflow-hidden">
          {NAV_ITEMS.map((it) => (
            <button
              key={it.id}
              onClick={() => {
                // example: close menu. replace with actual navigation if needed
                setOpen(false);
                // You can dispatch navigation or update route here.
              }}
              className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              {it.label}
            </button>
          ))}

          <div className="border-t border-gray-100 mt-1" />
        </div>
      </div>
    </header>
  );
}
