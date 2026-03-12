import HeatmapLayer from "ol/layer/Heatmap";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

export default function createHeatLayer(temperatureData) {
  const MIN_TEMP = 30;
  const MAX_TEMP = 40;

  const heatFeatures = temperatureData.temperature.map((p) => {
    // normalize temp between 0 and 1
    let weight = (p.value - MIN_TEMP) / (MAX_TEMP - MIN_TEMP);

    // clamp value
    weight = Math.max(0, Math.min(1, weight));

    const feature = new Feature({
      geometry: new Point(fromLonLat([p.lng, p.lat])),
    });

    feature.set("weight", Math.pow(weight, 2));
    return feature;
  });

  return new HeatmapLayer({
    source: new VectorSource({ features: heatFeatures }),
    blur: 50,
    radius: 5,
    weight: (f) => f.get("weight"),
  });
}
