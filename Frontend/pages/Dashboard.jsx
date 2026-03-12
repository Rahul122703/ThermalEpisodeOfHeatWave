import React from "react";
import Navbar from "../src/components/Layout/Navbar";
import FilterPanel from "../src/components/Sidebar/FilterPanel";
import IndiaHeatMap from "../src/components/HeatMap/IndiaHeatMap";
import MapContainer from "../src/components/MapContainer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-full">
              <FilterPanel />
            </div>
          </aside>

          {/* Map Section */}
          <section className="lg:col-span-9">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              {/* Map Container */}
              <div className="w-full h-full   border border-none rounded-lg overflow-hidden ">
                <MapContainer />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
