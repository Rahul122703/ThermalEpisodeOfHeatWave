import GeoJSON from "ol/format/GeoJSON";

export default function loadRegions(regionSource) {
  fetch("/regions.geojson")
    .then((res) => res.json())
    .then((data) => {
      const features = new GeoJSON().readFeatures(data, {
        featureProjection: "EPSG:3857",
      });

      features.forEach((f) => regionSource.addFeature(f));
    });
}