import { Button } from './ui/button.tsx';


export default function Navbar() {
	const username = localStorage.getItem('username')!;

	const handleDisconnect = () => {
		localStorage.removeItem('username');
    window.location.reload();
	}

	return (
		<nav className="flex items-center justify-between py-4 bg-primary text-primary-foreground">
			<h1 className="text-3xl font-bold">Alertes</h1>
			<div className="flex items-center space-x-4">
				<span className="text-xl">{username}</span>
				<Button onClick={handleDisconnect}>Se déconnecter</Button>
			</div>
		</nav>
	);
}

