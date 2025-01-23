import './App.css'
import "tailwindcss";
import Home from './homePage'
import { useEffect } from 'react';
import { getZone } from './lib/common/zone.ts';

function App() {

  useEffect(() => {
    async function init() {

      const zone = await getZone();
      console.log(zone);
    }
    init();
  }, []);

  return (
    <Home></Home>
  )
}

export default App
