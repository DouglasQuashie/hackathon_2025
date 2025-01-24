import { Button } from './ui/button.tsx';


export default function Navbar({ username }: { username: string }) {
	const handleDisconnect = () => {
		localStorage.removeItem('username');
		window.location.reload();
	};

	return (
		<nav className="flex items-center justify-between py-4 bg-primary text-primary-foreground">
			<h1 className="text-3xl font-bold">Alertes</h1>
				{username &&
					<div className="flex items-center space-x-4">
						<span className="text-xl">{username}</span>
						<Button onClick={handleDisconnect} className='cursor-pointer'>Se déconnecter</Button>
					</div>
				}

		</nav>
	);
}

