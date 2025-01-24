import { FormEvent, useState } from 'react';

import Home from './Home.tsx';
import { Label } from './ui/label.tsx';
import { Input } from './ui/input.tsx';
import { Button } from './ui/button.tsx';
import Chat from './Chat.tsx';

export default function Username() {
	const [username, setUsername] = useState("")
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (username.trim()) {
			localStorage.setItem('username', username)
			setIsLoggedIn(true)
		}
	}

	if (isLoggedIn) {
		return <Chat />
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
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<Button type="submit" className="w-full">
						Me connecter avec ce nom d'utilisateur
					</Button>
				</form>
			</div>
		</div>
	)
}

