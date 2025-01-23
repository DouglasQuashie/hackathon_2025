import * as turf from '@turf/turf';
import { Point } from './interfaces/Point.ts';

/**
 * Check if a point is inside a hexagon-like area defined by 5 points.
 *
 * @param {Array} hexagonPoints - Array of 5 latitude/longitude points forming a hexagon (e.g., [{lat, lng}, ...]).
 * @param {Object} point - Latitude and longitude of the point to check (e.g., {lat, lng}).
 * @returns {boolean} - True if the point is inside the hexagon, otherwise false.
 */
export function isPointInHexagon(hexagonPoints: Point[], point: Point): boolean {
	// Transform coordinates, ensuring they're properly parsed
	const coordinates = hexagonPoints.map(coord => [
		parseFloat(coord.longitude),
		parseFloat(coord.latitude)
	]);

	// Close the polygon by repeating the first point
	coordinates.push(coordinates[0]);

	const pointGeo = turf.point([
		parseFloat(point.longitude),
		parseFloat(point.latitude)
	]);

	const hexagonPolygon = turf.polygon([coordinates]);

	return turf.booleanPointInPolygon(pointGeo, hexagonPolygon);
}
