import HeatmapLayer from "ol/layer/Heatmap";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

export default function createHeatLayer(temperatureData) {
  const heatFeatures = temperatureData.temperature.map((p) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([p.lng, p.lat])),
    });

    feature.set("weight", p.value / 50);
    return feature;
  });

  return new HeatmapLayer({
    source: new VectorSource({ features: heatFeatures }),
    blur: 35,
    radius: 25,
    weight: (f) => f.get("weight"),
  });
}