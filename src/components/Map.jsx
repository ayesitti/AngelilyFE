
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

function Map(props) {
 let {latitude} = props.oneHotel

  let {longitude} = props.oneHotel
  longitude =  Number(longitude).toFixed(3)
  latitude =  Number(latitude).toFixed(3)

  let arr = [];
  arr.push(+latitude, +longitude);
  console.log(arr, 'map')

let {title} = props.oneHotel
                
  return (
    <div className="cotainerMap">

   
    <MapContainer center={arr} zoom={15} scrollWheelZoom={false} className="map">
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={arr}>
    <Popup>
      {title}
    </Popup>
  </Marker>
</MapContainer>
  </div>
  )
}

export default Map