export default function generateWestHeatPoints(geojson, temperature) {
  const westFeature = geojson.features.find(
    (f) => f.properties.region.toLowerCase() === "west"
  );

  if (!westFeature) return [];

  const coords = westFeature.geometry.coordinates[0][0];

  // Find bounding box
  let minLng = Infinity;
  let maxLng = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  coords.forEach(([lng, lat]) => {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  });

  function pointInPolygon(point, polygon) {
    const [x, y] = point;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0],
        yi = polygon[i][1];
      const xj = polygon[j][0],
        yj = polygon[j][1];

      const intersect =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  }

  const points = [];

  while (points.length < 150) {
    const lng = minLng + Math.random() * (maxLng - minLng);
    const lat = minLat + Math.random() * (maxLat - minLat);

    if (pointInPolygon([lng, lat], coords)) {
      points.push({
        lat,
        lng,
        value: temperature,
      });
    }
  }

  return points;
}