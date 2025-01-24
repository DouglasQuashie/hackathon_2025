import './App.css';
import 'tailwindcss';
import { useEffect } from 'react';
import Home from './components/Home.tsx';
import { getZone } from './lib/common/Zone.ts';
import { toast } from './hooks/use-toast.ts';
import { WsEvent } from './lib/common/WsEvent.ts';
import socket from './lib/socket.ts';

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
			const zone = await getZone() ?? "-1";
			localStorage.setItem("zone", zone);
			socket.emit(WsEvent.JOIN_ZONE, zone);
		}

		init();
	}, []);

	return <Home /> ;
}

export default App;
