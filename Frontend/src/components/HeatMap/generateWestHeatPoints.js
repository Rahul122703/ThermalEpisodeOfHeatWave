export default async function generateWestHeatPoints(temperature) {
  const response = await fetch("/regions.geojson");
  const geojson = await response.json();

  const westFeature = geojson.features.find(
    (feature) => feature.properties.region.toLowerCase() === "west"
  );

  if (!westFeature) return [];

  const geometry = westFeature.geometry;
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