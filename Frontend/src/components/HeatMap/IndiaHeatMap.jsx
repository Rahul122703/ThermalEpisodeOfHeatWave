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
import createHeatLayer from "./createHeatLayer";

import generateWestHeatPoints from "./generateWestHeatPoints";
import generateNorthHeatPoints from "./generateNorthHeatPoints";

// Convert "Mar 12" → forecast index
function getForecastIndex(selectedDate) {
  const today = new Date();

  const [month, day] = selectedDate.split(" ");

  const selected = new Date(`${month} ${day}, ${today.getFullYear()}`);

  const diff = Math.floor((selected - today) / (1000 * 60 * 60 * 24));

  return Math.max(0, diff);
}

export default function IndiaHeatMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const heatLayerRef = useRef(null);

  const { selectedSeason, selectedDate, selectedRegion } = useSelector(
    (state) => state.filter,
  );

  const westData = useSelector((state) => state.west);
  const northData = useSelector((state) => state.north);

  // create map once
  useEffect(() => {
    if (mapInstance.current) return;

    const regionSource = new VectorSource();
    const regionLayer = createRegionLayer(regionSource);

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), regionLayer],
      view: new View({
        center: fromLonLat([78.6569, 22.9734]),
        zoom: 5,
      }),
    });

    mapInstance.current = map;

    loadRegions(regionSource);

    return () => {
      map.setTarget(null);
      mapInstance.current = null;
    };
  }, []);

  // update heatmap
  useEffect(() => {
    if (!mapInstance.current) return;

    let forecastData = null;

    /*
      WEST REGION DATA
    */
    if (selectedRegion === "West") {
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
    }

    /*
      NORTH REGION DATA
    */
    if (selectedRegion === "North") {
      switch (selectedSeason) {
        case "Monsoon":
          forecastData = northData.monsoon;
          break;

        case "Postmonsoon":
          forecastData = northData.postmonsoon;
          break;

        default:
          break;
      }
    }

    if (!forecastData) return;

    const index = getForecastIndex(selectedDate);

    const temperature = forecastData?.forecast_next_7_days?.[index];

    if (temperature == null) return;

    /*
      UPDATE REGION LABEL TEMPERATURE
    */
    const features = mapInstance.current
      .getLayers()
      .item(1)
      .getSource()
      .getFeatures();

    features.forEach((feature) => {
      const regionName = feature.get("region");

      if (regionName?.toLowerCase() === selectedRegion.toLowerCase()) {
        feature.set("temperature", temperature);
        feature.changed();
      }
    });

    /*
      UPDATE HEATMAP
    */
    async function updateHeatmap() {
      let heatPoints = [];

      if (selectedRegion === "West") {
        heatPoints = await generateWestHeatPoints(temperature);
      }

      if (selectedRegion === "North") {
        heatPoints = await generateNorthHeatPoints(temperature);
      }

      const heatLayer = createHeatLayer({
        temperature: heatPoints,
      });

      if (heatLayerRef.current) {
        mapInstance.current.removeLayer(heatLayerRef.current);
      }

      mapInstance.current.addLayer(heatLayer);

      heatLayerRef.current = heatLayer;
    }

    updateHeatmap();
  }, [selectedSeason, selectedDate, selectedRegion, westData, northData]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "600px",
      }}
    />
  );
}
