import { Style, Stroke, Fill, Text } from "ol/style";
import VectorLayer from "ol/layer/Vector";

const regionColors = {
  north: "rgba(255,0,0,0.2)",
  west: "rgba(255,165,0,0.2)",
  central: "rgba(255,255,0,0.2)",
  east: "rgba(0,0,255,0.2)",
  south: "rgba(0,128,0,0.2)",
  northeast: "rgba(128,0,255,0.2)",
};

export default function createRegionLayer(regionSource) {
  return new VectorLayer({
    source: regionSource,
    style: (feature) => {
      const region = feature.get("region") || "";
      const temperature = feature.get("temperature");

      let label = region.toUpperCase();

      if (temperature != null) {
        label = `${region.toUpperCase()}\n${temperature.toFixed(1)}°C`;
      }

      return new Style({
        stroke: new Stroke({
          color: "#000",
          width: 3,
        }),

        fill: new Fill({
          color: regionColors[region] || "rgba(200,200,200,0.2)",
        }),

        text: new Text({
          text: label,
          font: "bold 16px Arial",
          fill: new Fill({ color: "#000" }),
          stroke: new Stroke({
            color: "#fff",
            width: 3,
          }),
        }),
      });
    },
  });
}