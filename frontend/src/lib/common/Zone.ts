import { getZones } from '../../services/Api.ts';
import { isPointInHexagon } from './Math.ts';


export async function getZone(): Promise<string | undefined> {
	const zones = await getZones();
	const myPosition = JSON.parse(localStorage.getItem('coordinates') || '{}');

	if (!myPosition.longitude || !myPosition.latitude)
		return undefined;

	for (const zone of zones.data) {
		const isPositionInPoint = isPointInHexagon(zone.coordinates, myPosition);
		if (isPositionInPoint)
			return zone.name

	}

	return undefined;
}
