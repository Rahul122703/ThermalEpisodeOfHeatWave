import React, { useEffect, useRef } from "react";
// import { temperatureData } from "../../api/data";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

import VectorSource from "ol/source/Vector";

// import createHeatLayer from "./createHeatLayer";
import createRegionLayer from "./createRegionLayer";
import loadRegions from "./loadRegions";

export default function IndiaHeatMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

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

  return <div ref={mapRef} className="w-full h-full" />;
}