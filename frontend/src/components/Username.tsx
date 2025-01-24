import { FormEvent, useState } from 'react';

import { Label } from './ui/label.tsx';
import { Input } from './ui/input.tsx';
import { Button } from './ui/button.tsx';
import Chat from './Chat.tsx';

export default function Username({ setUsername, username }: {
	setUsername: (username: string) => void,
	username: string
}) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [localUsername, setLocalUsername] = useState('');

	const handleSubmit = (e: FormEvent) => {
		console.log("submits");
		e.preventDefault();
		if (localUsername.trim()) {
			localStorage.setItem('username', localUsername);
			setUsername(localUsername);
			setIsLoggedIn(true);
		}
	};

	if (isLoggedIn) {
		return <Chat username={username}/>;
	}

	return (
		<div className="flex min-h-svh items-center justify-center">
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
					<Button type="submit" className="w-full cursor-pointer">
						Me connecter avec ce nom d'utilisateur
					</Button>
				</form>
			</div>
		</div>
	);
}

