import React, { useEffect, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './historymap.css'
import mapData from '../mapsData.json';  // Assuming your JSON file is directly inside the parent directory of this component file
function Histroy() {
    const [Data, setData] = useState(mapData);
    useEffect(() => {
        // Check if map already exists
        const existingMap = L.DomUtil.get('map');
        if (existingMap) {
            existingMap._leaflet_id = null;
        }
        // var customIcon = L.icon({
        //     iconUrl: 'https://img.freepik.com/premium-vector/pin-point-icon-with-red-map-location-pointer-symbol-isolated-white-background_120819-234.jpg',
        //     iconSize: [38, 95], // size of the icon
        //     shadowSize: [50, 64], // size of the shadow
        //     iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        //     shadowAnchor: [4, 62], // the same for the shadow
        //     popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        // });
            var map = L.map('map', {
            setView:[50.82866216505195, 4.344832685773423],
            center:[50.8328725036159, 4.360075151298572],
            zoom: 12.5,
            dragging:false,
            scrollWheelZoom:false,
            zoomControl: false
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        }).addTo(map);
        Data.map((pins, index) => {
            L.marker([pins.location.latitude, pins.location.longitude]).addTo(map)
                .bindPopup(`<div class="holder">
               <h1>${pins.name}</h1>
               <img src="${pins.image}">
               <p>${pins.description}</p>
               <p>${pins.fact}</p>
           </div>`)
                .openPopup();
            return <h1 key={index}>marks added is : {index}</h1>;
        })


        // Cleanup on unmount
        return () => {
            map.remove();
        };
    }, []);
    return (
        <div className='map-conainer'>
            <h1>how to use it </h1>
            <div id="map" className="main-map"></div>

        </div>
    );
}
export default Histroy;
