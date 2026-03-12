import React, { useEffect, useRef } from "react";
import { temperatureData } from "../../api/data";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import HeatmapLayer from "ol/layer/Heatmap";
import VectorLayer from "ol/layer/Vector";

import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";

import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat } from "ol/proj";

import { Style, Stroke, Fill } from "ol/style";

export default function IndiaHeatMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return;

    /* -------------------------
       HEATMAP POINTS
    -------------------------- */

    const heatFeatures = temperatureData.temperature.map((p) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([p.lng, p.lat])),
      });

      feature.set("weight", p.value / 50);
      return feature;
    });

    const heatLayer = new HeatmapLayer({
      source: new VectorSource({ features: heatFeatures }),
      blur: 35,
      radius: 25,
      weight: (f) => f.get("weight"),
    });

    /* -------------------------
       REGION SOURCE
    -------------------------- */

    const regionSource = new VectorSource();

    const regionColors = {
      north: "rgba(255,0,0,0.2)",
      west: "rgba(255,165,0,0.2)",
      central: "rgba(255,255,0,0.2)",
      east: "rgba(0,0,255,0.2)",
      south: "rgba(0,128,0,0.2)",
      northeast: "rgba(128,0,255,0.2)",
    };

    const regionLayer = new VectorLayer({
      source: regionSource,
      style: (feature) =>
        new Style({
          stroke: new Stroke({
            color: "#000",
            width: 3,
          }),
          fill: new Fill({
            color: regionColors[feature.get("region")] || "rgba(200,200,200,0.2)",
          }),
        }),
    });

    /* -------------------------
       CREATE MAP
    -------------------------- */

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        heatLayer,
        regionLayer,
      ],
      view: new View({
        center: fromLonLat([78.6569, 22.9734]),
        zoom: 5,
      }),
    });

    mapInstance.current = map;

    /* -------------------------
       LOAD REGION GEOJSON
    -------------------------- */

    fetch("/regions.geojson")
      .then((res) => res.json())
      .then((data) => {
        const features = new GeoJSON().readFeatures(data, {
          featureProjection: "EPSG:3857",
        });

        features.forEach((f) => regionSource.addFeature(f));
      });

    return () => {
      map.setTarget(null);
      mapInstance.current = null;
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}