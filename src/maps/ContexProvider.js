import React, { useEffect, useState } from 'react';
import { DataContext } from './DataContext';
import axios from 'axios';

const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [locationLatitude, setLocationLatitude] = useState({
        lat: '',
        lng: ''
    });

    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = localStorage.getItem("favorites");
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error("Error parsing favorites from local storage", error);
            return [];
        }
    });

    const addToFavorites = (item) => {
        try {
            const savedFavorites = localStorage.getItem("favorites");
            const currentFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

            const exists = currentFavorites.some(fav => fav.id === item.id);
            if (!exists) {
                const updatedFavorites = [...currentFavorites, item];
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                setFavorites(updatedFavorites);
            }
        } catch (error) {
            console.error("Error handling favorites", error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng',
                params: {
                    longitude: locationLatitude.lng,
                    latitude: locationLatitude.lat,
                    unit: 'km',
                    currency: 'USD',
                    lang: 'en_US'
                },
                headers: {
                    'X-RapidAPI-Key': 'c0ddd6bb8amshc0000ee765acff8p120335jsn21125ecc4cad',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setData(response.data);  // Assuming you want to set the fetched data to your state
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [locationLatitude]);


    const handleLocationClick = (lat,lng) => {
        setLocationLatitude({lat,lng});
    };

    const value = {
        data,
        locationLatitude,
        setLocationLatitude,// Only providing this combined object
        handleLocationClick,
        favorites,
        addToFavorites
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;