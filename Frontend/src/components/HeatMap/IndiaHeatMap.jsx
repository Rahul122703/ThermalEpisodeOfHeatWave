import React, { useEffect, useRef } from "react";

import { temperatureData } from "../../api/data";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import HeatmapLayer from "ol/layer/Heatmap";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

export default function IndiaHeatMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return;

    const features = temperatureData.temperature.map((p) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([p.lng, p.lat])),
      });

      feature.set("weight", p.value / 50);
      return feature;
    });

    const vectorSource = new VectorSource({
      features,
    });

    const heatLayer = new HeatmapLayer({
      source: vectorSource,
      blur: 35,
      radius: 25,
      weight: (feature) => feature.get("weight"),
    });

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        heatLayer,
      ],
      view: new View({
        center: fromLonLat([78.6569, 22.9734]),
        zoom: 5,
      }),
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
  );
}
