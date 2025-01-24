import './App.css';
import 'tailwindcss';
import { useEffect } from 'react';
import Home from './components/Home.tsx';
import { getZone } from './lib/common/Zone.ts';
import { toast } from './hooks/use-toast.ts';

function App() {

	toast({
		title: 'Erreur',
		description: 'Veuillez renseigner toutes les informations.',
	});
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
			console.log(zone);
			localStorage.setItem("zone", zone ?? "1");
		}

		init();
	}, []);

	return <Home /> ;
}

export default App;
