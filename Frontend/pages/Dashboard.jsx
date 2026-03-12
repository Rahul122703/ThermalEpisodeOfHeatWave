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
        {/* Dashboard Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Heatwave Forecast Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor predicted maximum temperatures and potential heatwave zones
            across India.
          </p>
        </div>

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
              {/* Map Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Maximum Temperature
                  </h3>
                  <p className="text-sm text-gray-500">
                    Heat distribution across regions
                  </p>
                </div>

                {/* Toggle placeholder for Heatwave Warning */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Heatwave Warning
                  </span>

                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition" />
                  </button>
                </div>
              </div>

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
