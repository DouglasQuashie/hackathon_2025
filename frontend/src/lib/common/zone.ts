import { getZones } from '../../services/api.tsx';
import { isPointInHexagon } from './math.ts';


export async function getZone(): Promise<string | undefined> {
	const zones = await getZones();
	const myPosition = JSON.parse(localStorage.getItem('coordinates') || '{}');
	console.log(myPosition);

	if (!myPosition)
		return undefined;

	for (const zone of zones.data) {
		 const isPositionInPoint = isPointInHexagon(zone.coordinates, myPosition);
		 if (isPositionInPoint) return zone.name;
	}

	return undefined;
}
