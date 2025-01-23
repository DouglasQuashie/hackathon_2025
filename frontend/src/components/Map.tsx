
import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

export default function Map() {
    useEffect(() => {
        import("leaflet/dist/leaflet.css")
    }, [])

    return (
        <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[48.8566, 2.3522]}>
                <Popup>Paris, la ville lumière.</Popup>
            </Marker>
        </MapContainer>
    )
}

