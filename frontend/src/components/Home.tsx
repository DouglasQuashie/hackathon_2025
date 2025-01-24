import Navbar from './NavBar.tsx';
import Map from './Map.tsx';
import Chat from './Chat.tsx';
import Username from './Username.tsx';

export default function Home() {
	const username = localStorage.getItem('username');

  return (
    <div className="container flex flex-col h-screen p-8">
	    <Navbar/>
        <div className="flex flex-1 overflow-hidden">
            <div className="w-2/3 h-full">
                <Map />
            </div>
            <div className="w-1/3 h-full border-l">
	            {username ? <Chat/> : <Username/>}
            </div>
        </div>
    </div>
  )
}
