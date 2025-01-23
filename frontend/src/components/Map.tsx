import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Polygon } from 'react-leaflet';
import { getZones } from '../services/api.tsx';
import { LatLngExpression } from 'leaflet';

interface Zone {
    name: string;
    coordinates: { latitude: string; longitude: string; }[];
}

export default function Map() {
	
	const [zonesData, setZones] = useState<Zone[]>([]);

	const transformCoordinates = (coordinates: { latitude: string; longitude: string; }[]) => {
		return coordinates.map((coord: { latitude: string; longitude: string; }) => [
			parseFloat(coord.latitude),
			parseFloat(coord.longitude)
		]);
	};

	const getPosition = (): LatLngExpression => {

		const myPosition = JSON.parse(localStorage.getItem('coordinates') || '{}');

		if (!myPosition)
			return [48.8566, 2.3522];

		return [myPosition.latitude, myPosition.longitude];
	}

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
		<MapContainer  center={getPosition()} zoom={13} style={{ height: "100%", width: "100%" }}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{zonesData.length > 0 && zonesData.map((zone: any, index) => (
				<Polygon
					key={zone.name}
					positions={transformCoordinates(zone.coordinates)}
					color={colors[index % colors.length]}
					fillColor={colors[index % colors.length]}
					fillOpacity={0.5}
				>
					<Popup>{zone.name}</Popup>
				</Polygon>
			))}
		</MapContainer>
	);
}

