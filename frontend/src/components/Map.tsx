import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Polygon } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { ZoneItem } from '../lib/chat/interfaces/Zone.ts';
import { getZones } from '../services/Api.ts';
import { CatastrophePopup } from './CatastrophePopup.tsx';
import { ActivityPopup } from './ActivityPopup.tsx';

export default function Map() {
	const [zonesData, setZones] = useState<ZoneItem[]>([]);

	const transformCoordinates = (coordinates: ZoneItem['coordinates']): LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] => {
		return coordinates.map((coord) => [
			parseFloat(coord.latitude),
			parseFloat(coord.longitude)
		]);
	};

	const getPosition = (): LatLngExpression => {

		const myPosition = JSON.parse(localStorage.getItem('coordinates') || '{}');

		if (!myPosition.latitude && !myPosition.longitude)
			return [48.8566, 2.3522];

		return [myPosition.latitude, myPosition.longitude];
	};

	const colors = ['blue', 'green', 'red', 'purple', 'orange'];

	useEffect(() => {
		async function init() {
			const zones = await getZones();
			setZones(zones.data);
		}

		init();

		import('leaflet/dist/leaflet.css');
	}, []);

	return (

		<MapContainer center={getPosition()} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{zonesData.length > 0 && zonesData.map((zone, index) => (
				<Polygon
					key={zone.name}
					positions={transformCoordinates(zone.coordinates)}
					color={colors[index % colors.length]}
					fillColor={colors[index % colors.length]}
					fillOpacity={0.5}
				>
					<Popup>
						<p>{zone.name}</p>
						<div className="flex flex-col gap-2">
						<CatastrophePopup catastrophes={[]}/>
						<ActivityPopup activities={[]}/>
						</div>
					</Popup>
				</Polygon>
			))}
		</MapContainer>
	);
}

