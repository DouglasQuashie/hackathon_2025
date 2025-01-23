import './App.css';
import 'tailwindcss';
import Home from './homePage';
import { useEffect } from 'react';
import { getZone } from './lib/common/zone.ts';

function App() {

	navigator.geolocation.getCurrentPosition(
		(position) => {
			localStorage.setItem('coordinates', JSON.stringify({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			}));
		},
		(error) => {
			console.log(error);
		}
	);

	useEffect(() => {
		async function init() {
			const zone = await getZone();
			if (!zone) return;
			localStorage.setItem("zone", zone);
		}

		init();
	}, []);

	return <Home />;
}

export default App;
