
import React, {useContext, useEffect, useState} from 'react';
import L from 'leaflet';
import './bigmap.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-search/dist/leaflet-search.min.css';
import 'leaflet-search';
import  {DataContext} from './DataContext'
import Tabs from './poops'
import mapData from '../mapsData.json'
import {marker} from "leaflet/src/layer";

function Bigmap() {
    const {
        data,
        addToFavorites,
        locationLatitude,
        setLocationLatitude,
    } = useContext(DataContext);
    const [location, setLocation] = useState({ lat: 0, long: 0 });  // Using 0,0 as fake values
    useEffect(() => {
        function success(pos) {
            const crd = pos.coords;
            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            setLocation({ lat: crd.latitude, long: crd.longitude });
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    const test = () => {
    }
    useEffect(() => {
        console.log('corda::' + location.lat)
        let map = L.map('map', {
            center: [51.505, -0.09],
            zoom: 13
        });
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);



        if (data) {
            data?.data.map((pins, index) => {
                if (pins.latitude && pins.longitude) {
                    let greenIcon = L.divIcon({
                        className: 'custom-div-icon',
                        html: `<div  class="image-holder"><img src="${pins.image}"></div><div class="pin-tail"></div>`,
                        iconSize: [38, 95],
                        iconAnchor: [22, 94],
                        popupAnchor: [-3, -76],
                    });
                        let marker = L.marker([pins.latitude, pins.longitude], {icon: greenIcon}).addTo(map)
                        .bindPopup(`<div class="holder">
                                <IconButton>
                                    <i className="fas fa-heart" />
                                </IconButton>
                                <h1>${pins.name}</h1>
                                <img src="${pins?.photo?.images?.large?.url}">
                                <p>${pins.description}</p>
                                <p>${pins.fact}</p>
                                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Take me there</button>
                                <button class="add-to-fav-btn bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Add to favourt</button>
                            </div>`);

                    marker.on('popupopen', function(e) {
                        let btn = e.popup._contentNode.querySelector('.add-to-fav-btn');
                        if (btn) {
                            btn.addEventListener('click', function() {
                                addToFavorites(pins);
                            });
                        }
                    });
                }
            });
        }


        const layerGroup = L.layerGroup().addTo(map);
        if (data) {
            data?.data.map((imp, index) => {
                if (imp.special_key && imp.location?.latitude && imp.location?.longitude) {
                    // Create a new marker and add it to the layer group
                    const marker = L.marker([imp.location.latitude, imp.location.longitude]).addTo(layerGroup);
                    marker.bindPopup(`<div class="holder">
               <h1>${imp.name}</h1>
                <img src="${imp?.photo?.images?.large?.url}">
               <p>${imp.description}</p>
               <p>${imp.fact}</p>
           </div>`);
                }
            });
        }

        map.on('click',function (e){
            let lat = e.latlng.lat;
            let lng = e.latlng.lng;
            setLocationLatitude({
                lat: lat,
                lng: lng
            })
        })

        map.on('popupopen', function(e) {
            var marker = e.target;
            console.log(marker)
        });
        map.on('zoomstart', function(e) {
            if (e.target._zoom > 12 ) {
                layerGroup.addTo(map);
            }else {
                layerGroup.remove();
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
    }, []);

    return (
        <div className='map-conainer shadow-sm	'>
            <Tabs/>
            <div id="map" className="mainn-mapp"></div>
        </div>
    );
}
export default Bigmap;
