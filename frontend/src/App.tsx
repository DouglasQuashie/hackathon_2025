import './App.css';
import 'tailwindcss';
import { useEffect } from 'react';
import Home from './components/Home.tsx';
import { getZone } from './lib/common/Zone.ts';

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
