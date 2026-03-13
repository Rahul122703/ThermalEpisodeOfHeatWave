export default async function generateNorthHeatPoints(temperature) {
  const response = await fetch("/regions.geojson");
  const geojson = await response.json();

  const northFeature = geojson.features.find(
    (feature) => feature.properties.region.toLowerCase() === "north",
  );

  if (!northFeature) return [];

  const geometry = northFeature.geometry;
  const points = [];

  geometry.coordinates.forEach((polygon) => {
    polygon.forEach((ring) => {
      ring.forEach(([lng, lat]) => {
        points.push({
          lat,
          lng,
          value: temperature,
        });
      });
    });
  });

  return points;
}
