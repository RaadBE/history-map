import React, {useContext, useEffect, useState} from 'react';
import L from 'leaflet';
import './bigmap.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-search/dist/leaflet-search.min.css';
import 'leaflet-search';
import  {DataContext} from './DataContext'
import Tabs from './poops'
import mapData from '../mapsData.json'
function Bigmap() {
    const { data, setData } = useContext(DataContext);
    // const [Zooms,setzoomIn] = useState()
    useEffect(() => {
        let map = L.map('map').setView([50.819051283509054, 4.353727734170263], 9)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

        if (data) {
            data.map((pins, index) => {
                let greenIcon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div class="image-holder"><img src="${pins.image}"></div><div class="pin-tail"></div>`,
                    iconSize: [38, 95],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                });
                L.marker([pins.location.latitude, pins.location.longitude], {icon: greenIcon}).addTo(map)
                    .bindPopup(`<div class="holder">
               <h1>${pins.name}</h1>
               <img src="${pins.image}">
               <p>${pins.description}</p>
               <p>${pins.fact}</p>
           </div>`)
            })
        }
        const test1 = L.marker([50.852117057209014, 4.3592208980725164]).addTo(map)
        test1.bindPopup('bigboos');

        map.on('zoomstart', function(e) {
            if (e.target._zoom > 12 ) {
                test1.addTo(map);
            }else {
                test1.remove();

            }
        });
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
    }, [data]);

    return (
        <div className='map-conainer'>
                <Tabs/>
            <div id="map" className="mainn-mapp"></div>
        </div>
    );
}
export default Bigmap;