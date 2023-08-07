import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

function Map(props) {
  console.log(props, 'map')
   // const lonlan = [48.8566, 2.3522]
  

    /*useEffect(() => {

      const map = L.map('map').setView(lonlan, zoom);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

    }, [])*/


    /*L.Marker.prototype.options.icon = L.divIcon({className: 'pin2'});
        

                    const marker = L.marker([lat, lng]);
                    marker.velodata = item;*/
                 //   this.markerList.push( marker.addTo(this.map))
                
  return (
    
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: '1000px'}}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
  )
}

export default Map