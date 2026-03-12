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
import { westHeatPoints } from "./westHeatPoints";

export default function IndiaHeatMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const heatLayerRef = useRef(null);

  const { selectedRegion, selectedSeason, selectedDate, dates } =
    useSelector((state) => state.filter);

  const west = useSelector((state) => state.west);

  // create map once
  useEffect(() => {
    if (mapInstance.current) return;

    const regionSource = new VectorSource();
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

    loadRegions(regionSource);

    return () => {
      map.setTarget(null);
      mapInstance.current = null;
    };
  }, []);

  // update heatmap when filters change
  useEffect(() => {
    if (!mapInstance.current) return;
    if (selectedRegion !== "West") return;

    let seasonData = null;

    if (selectedSeason === "Winter") seasonData = west.winter;
    if (selectedSeason === "Premonsoon") seasonData = west.premonsoon;
    if (selectedSeason === "Monsoon") seasonData = west.monsoon;
    if (selectedSeason === "Postmonsoon") seasonData = west.postmonsoon;

    if (!seasonData) return;

    const dateIndex = dates.indexOf(selectedDate);

    const temperature =
      seasonData?.forecast_next_7_days?.[dateIndex];

    if (temperature === undefined) return;

    const heatData = {
      temperature: westHeatPoints(temperature),
    };

    const heatLayer = createHeatLayer(heatData);

    if (heatLayerRef.current) {
      mapInstance.current.removeLayer(heatLayerRef.current);
    }

    mapInstance.current.addLayer(heatLayer);
    heatLayerRef.current = heatLayer;

  }, [selectedDate, selectedSeason, selectedRegion, west]);

  return <div ref={mapRef} className="w-full h-full" />;
}