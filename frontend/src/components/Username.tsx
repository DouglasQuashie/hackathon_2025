import { useState } from 'react';

export default function Username() {
	const [user, setUser] = useState('');


	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user) {
			alert('Veuillez entrer un nom d\'utilisateur');
			return;
		}

		localStorage.setItem("username", user);
		location.reload();
	};


	return (
		<div className="flex flex-col h-screen">
			<div className="flex overflow-hidden">
				<form className="flex gap-2" onSubmit={handleSubmit}>
					<input className="border-2 border-white" value={user} onChange={(e) => setUser(e.target.value)} type="text"/>
					<button type="submit">Me connecter avec ce nom d'utilisateur</button>
				</form>
			</div>
		</div>
	);
}
