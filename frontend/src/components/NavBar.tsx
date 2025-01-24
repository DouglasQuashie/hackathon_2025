import { Button } from './ui/button.tsx';


export default function Navbar({ username }: { username: string }) {
	const handleDisconnect = () => {
		localStorage.removeItem('username');
		window.location.reload();
	};

	return (
		<nav className="flex items-center justify-between py-4">
            <div className='flex items-center space-x-4'>
                <h1 className="text-3xl font-bold me-10">Alertes</h1>
                <Button onClick={() => location.replace("/catastrophe")} className='cursor-pointer bg-red-600 text-white hover:bg-white hover:text-red-600'>Ajouter un sinistre</Button>
                <Button onClick={() => location.replace("/activity")} className='cursor-pointer hover:bg-gray-200 text-sm'>Créer une activité</Button>
            </div>
            {username &&
                <div className="flex items-center space-x-4">
                    <span className="text-xl">{username}</span>
                    <Button onClick={handleDisconnect} className='cursor-pointer hover:bg-gray-200'>Se déconnecter</Button>
                </div>
            }
		</nav>
	);
}

