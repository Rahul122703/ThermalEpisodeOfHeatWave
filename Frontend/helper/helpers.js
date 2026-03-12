function getForecastIndex(selectedDate) {
  const today = new Date();
  const selected = new Date(selectedDate);

  const diff = Math.floor((selected - today) / (1000 * 60 * 60 * 24));

  return diff;
}

import VectorLayer from "ol/layer/Vector";
import { Style, Fill, Stroke } from "ol/style";

function getColor(temp) {
  if (!temp) return "rgba(200,200,200,0.4)";
  if (temp > 38) return "#8B0000";
  if (temp > 36) return "#E53935";
  if (temp > 34) return "#FB8C00";
  if (temp > 32) return "#FFD54F";
  return "#FFF176";
}

export default function createRegionLayer(source) {
  return new VectorLayer({
    source,
    style: function (feature) {
      const temp = feature.get("temperature");

      return new Style({
        fill: new Fill({
          color: getColor(temp),
        }),
        stroke: new Stroke({
          color: "#333",
          width: 1,
        }),
      });
    },
  });
}

export { getForecastIndex, getColor };
