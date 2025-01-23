import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { getZones } from '../services/api.tsx';
import { LatLngExpression } from 'leaflet';

export default function Map() {
	const [zonesData, setZones] = useState<any[]>([]);

	const transformCoordinates = (coordinates: any) => {
		return coordinates.map(coord => [
			parseFloat(coord.latitude),
			parseFloat(coord.longitude)
		]);
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

	console.log(zonesData);

	return (
		<MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "100%", width: "100%" }}>
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
			<Marker position={[48.8566, 2.3522]}>
				<Popup>Paris, la ville lumière.</Popup>
			</Marker>
		</MapContainer>
	);
}

