import { FormEvent, useState } from 'react';

import { Label } from './ui/label.tsx';
import { Input } from './ui/input.tsx';
import { Button } from './ui/button.tsx';
import Chat from './Chat.tsx';

export default function Username({ setUsername }: {
	setUsername: (username: string) => void,
}) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [localUsername, setLocalUsername] = useState('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (localUsername.trim()) {
			if(localStorage.getItem('coordinates') !== null) {
				localStorage.setItem('username', localUsername);
				setUsername(localUsername);
				setIsLoggedIn(true);
			} else {
				alert('Veuillez activer la géolocalisation pour continuer');
			}
		}
	};

	if (isLoggedIn) {
		return <Chat />;
	}

	return (
		<div className="flex min-h-svh justify-center p-4">
			<div className="w-full max-w-sm space-y-4">
				<h1 className="text-2xl font-bold text-center">Connexion</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Nom d'utilisateur</Label>
						<Input
							id="username"
							type="text"
							placeholder="Entrez votre nom d'utilisateur"
							value={localUsername}
							onChange={(e) => setLocalUsername(e.target.value)}
							required
						/>
					</div>
					<Button type="submit" className="w-full cursor-pointer hover:bg-gray-200 border hover:border-gray-400">
						Me connecter avec ce nom d'utilisateur
					</Button>
				</form>
			</div>
		</div>
	);
}

