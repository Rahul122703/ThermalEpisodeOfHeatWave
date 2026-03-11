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

import { Style, Stroke } from "ol/style";

export default function IndiaHeatMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return;

    /* -------------------------
       HEATMAP POINTS
    -------------------------- */

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

    /* -------------------------
       INDIA BOUNDARY LAYER
    -------------------------- */

    const indiaSource = new VectorSource();

    const indiaLayer = new VectorLayer({
      source: indiaSource,
      style: new Style({
        stroke: new Stroke({
          color: "#111827",
          width: 2,
        }),
      }),
    });

    /* -------------------------
       CREATE MAP
    -------------------------- */

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        heatLayer,
        indiaLayer,
      ],
      view: new View({
        center: fromLonLat([78.6569, 22.9734]),
        zoom: 5,
        minZoom: 4,
        maxZoom: 7,
      }),
    });

    mapInstance.current = map;

    /* -------------------------
       LOAD INDIA GEOJSON
    -------------------------- */

    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/IND.geo.json",
    )
      .then((res) => res.json())
      .then((data) => {
        const features = new GeoJSON().readFeatures(data, {
          featureProjection: "EPSG:3857",
        });

        indiaSource.addFeatures(features);
      });

    /* Fix map size */

    setTimeout(() => {
      map.updateSize();
    }, 200);

    return () => {
      map.setTarget(null);
      mapInstance.current = null;
    };
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
  );
}
