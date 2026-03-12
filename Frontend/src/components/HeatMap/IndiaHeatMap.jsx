import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import VectorSource from "ol/source/Vector";

import createRegionLayer from "./createRegionLayer";
import loadRegions from "./loadRegions";

// Convert "Mar 12" -> forecast index
function getForecastIndex(selectedDate) {
  const today = new Date();

  const [month, day] = selectedDate.split(" ");

  const selected = new Date(
    `${month} ${day}, ${today.getFullYear()}`
  );

  const diff = Math.floor(
    (selected - today) / (1000 * 60 * 60 * 24)
  );

  return Math.max(0, diff);
}

export default function IndiaHeatMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const regionSourceRef = useRef(null);

  const { selectedSeason, selectedDate, selectedRegion } =
    useSelector((state) => state.filter);

  const westData = useSelector((state) => state.west);

  // Create map once
  useEffect(() => {
    if (mapInstance.current) return;

    const regionSource = new VectorSource();
    regionSourceRef.current = regionSource;

    const regionLayer = createRegionLayer(regionSource);

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        regionLayer,
      ],
      view: new View({
        center: fromLonLat([78.6569, 22.9734]),
        zoom: 5,
      }),
    });

    mapInstance.current = map;

    // Load GeoJSON regions
    loadRegions(regionSource);

    return () => {
      map.setTarget(null);
      mapInstance.current = null;
    };
  }, []);

  // Update temperature heatmap
  useEffect(() => {
    if (!regionSourceRef.current) return;
    if (selectedRegion !== "West") return;

    let forecastData = null;

    switch (selectedSeason) {
      case "Winter":
        forecastData = westData.winter;
        break;

      case "Premonsoon":
        forecastData = westData.premonsoon;
        break;

      case "Monsoon":
        forecastData = westData.monsoon;
        break;

      case "Postmonsoon":
        forecastData = westData.postmonsoon;
        break;

      default:
        break;
    }

    if (!forecastData) return;

    const index = getForecastIndex(selectedDate);

    const temperature =
      forecastData?.forecast_next_7_days?.[index];

    if (temperature == null) return;

    const features = regionSourceRef.current.getFeatures();

    features.forEach((feature) => {
      const regionName = feature.get("region");

      if (regionName === "West") {
        feature.set("temperature", temperature);

        // Force OpenLayers to re-render
        feature.changed();
      }
    });
  }, [selectedSeason, selectedDate, westData, selectedRegion]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
    />
  );
}