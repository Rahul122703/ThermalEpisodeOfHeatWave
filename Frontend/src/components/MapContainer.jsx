import React, { useRef } from "react";
import IndiaHeatMap from "./HeatMap/IndiaHeatMap";
export default function MapContainer() {
  const containerRef = useRef(null);

  const toggleFullscreen = () => {
    const el = containerRef.current;

    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[calc(100dvh-12rem)] lg:flex-1 rounded-lg overflow-hidden border border-gray-200"
    >
      {/* Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur px-3 py-1.5 rounded-md text-sm font-medium shadow hover:bg-white transition"
      >
        Fullscreen
      </button>

      {/* Map */}
      <IndiaHeatMap />
    </div>
  );
}
