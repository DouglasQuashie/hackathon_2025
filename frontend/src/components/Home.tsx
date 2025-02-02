import Navbar from './NavBar.tsx';
import Map from './Map.tsx';
import Chat from './Chat.tsx';
import Username from './Username.tsx';
import { useState } from 'react';

export default function Home() {
	const [username, setUsername] = useState(localStorage.getItem('username') ?? '');

	return (
		<div className="flex flex-col h-screen p-8">
			<Navbar username={username}/>
			<div className="flex flex-1 overflow-hidden shadow border rounded-lg">
				<div className="w-2/3 h-full">
					<Map/>
				</div>
				<div className="w-1/3 h-full border-l">
					{username ? <Chat /> : <Username setUsername={setUsername} />}
				</div>
			</div>
		</div>
	);
}
