import { useState } from "react"
import Navbar from "./components/NavBar"
import Map from "./components/Map"
import Chat from "./components/Chat"

export default function Home() {
    const [user] = useState({ name: "John Doe" })

  return (
    <div className="flex flex-col h-screen">
        <Navbar user={user} />
        <div className="flex flex-1 overflow-hidden">
            <div className="w-2/3 h-full">
                <Map />
            </div>
            <div className="w-1/3 h-full border-l">
                <Chat />
            </div>
        </div>
    </div>
  )
}
