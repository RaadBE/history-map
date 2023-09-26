import React, {useContext, useEffect, useState} from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './historymap.css'
import { DataContext } from "./DataContext";

import mapData from '../mapsData.json';  // Assuming your JSON file is directly inside the parent directory of this component file
function Histroy() {
    const { data, setData } = useContext(DataContext);
    useEffect(() => {
        // Check if map already exists
        const existingMap = L.DomUtil.get('map');
        if (existingMap) {
            existingMap._leaflet_id = null;
        }
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
        if (data) {
            data.map((pins, index) => {
                L.marker([pins.location.latitude, pins.location.longitude]).addTo(map)
                    .bindPopup(`<div class="holder">
               <h1>${pins.name}</h1>
               <img src="${pins.image}">
               <p>${pins.description}</p>
           </div>`)
                    .openPopup();
                return <h1 key={index}>marks added is : {index}</h1>;
            })
        }
        return () => {
            map.remove();
        };
    }, [data]);
    return (
        <div className='map-conainer'>
            <h1>how to use it </h1>
            <div id="map" className="main-map"></div>

        </div>
    );
}
export default Histroy;
