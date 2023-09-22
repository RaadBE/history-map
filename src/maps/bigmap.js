import React, {useEffect, useState} from 'react';
import L from 'leaflet';
import './bigmap.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-search/dist/leaflet-search.min.css';
import 'leaflet-search';
import mapData from '../mapsData.json'
function Bigmap() {
    const [Data,setData] = useState(mapData)
    const [Zooms,setzoomIn] = useState()
    useEffect(() => {
        var map = L.map('map').setView([50.819051283509054, 4.353727734170263], 9);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        }).addTo(map);
        Data.map((pins,index) =>{
            L.marker([pins.location.latitude, pins.location.longitude]).addTo(map)
                .bindPopup(`<div class="holder">
               <h1>${pins.name}</h1>
               <img src="${pins.image}">
               <p>${pins.description}</p>
               <p>${pins.fact}</p>
           </div>`)
        })
        const test1 = L.marker([50.852117057209014, 4.3592208980725164]).addTo(map)
        test1.bindPopup('bigboos');

        map.on('zoomstart', function(e) {
            if (e.target._zoom > 12 ) {
                test1.addTo(map);
            }else {
                test1.remove();

            }
        });
        // Add search control
        new L.Control.Search({
            url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
            jsonpParam: 'json_callback',
            propertyName: 'display_name',
            propertyLoc: ['lat', 'lon'],
            marker: L.circleMarker([0, 0], {radius: 30}),
            autoCollapse: true,
            autoType: false,
            minLength: 2
        }).addTo(map);
        return () =>{
            map.remove();
        }
    }, []);

    return (
        <div className='map-conainer'>
            <h1>how to use it </h1>
            <div id="map" className="mainn-mapp"></div>
        </div>
    );
}

export default Bigmap;
