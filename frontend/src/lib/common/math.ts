import * as turf from '@turf/turf';
import { Point } from './interfaces/Point.ts';

/**
 * Check if a point is inside a hexagon-like area defined by 5 points.
 *
 * @param {Array} hexagonPoints - Array of 5 latitude/longitude points forming a hexagon (e.g., [{lat, lng}, ...]).
 * @param {Object} point - Latitude and longitude of the point to check (e.g., {lat, lng}).
 * @returns {boolean} - True if the point is inside the hexagon, otherwise false.
 */
function isPointInHexagon(hexagonPoints: Point[], point: Point) {
	// Ensure the hexagon is closed by appending the first point to the end
	const coordinates = hexagonPoints.map(({ lat, lng }) => [lng, lat]);
	coordinates.push(coordinates[0]);

	const pointGeo = turf.point([point.lng, point.lat]);
	const hexagonPolygon = turf.polygon([
		coordinates
	]);

	// Use Turf.js to check if the point is in the polygon
	return turf.booleanPointInPolygon(pointGeo, hexagonPolygon);
}
