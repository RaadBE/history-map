import React, { useEffect, useState } from 'react';
import { DataContext } from './DataContext';
import axios from 'axios';


const connect = process.env.REACT_APP_API_KEY
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
            if (locationLatitude.lat && locationLatitude.lng) {
                const options = {
                    method: 'GET',
                    url: `${process.env.REACT_APP_URL_KEY}`,
                    params: {
                        longitude: locationLatitude.lng,
                        latitude: locationLatitude.lat,
                        lunit: 'km',
                        currency: 'USD',
                        lang: 'en_US'
                    },
                    headers: {
                        'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
                        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                    }
                };

                try {
                    const response = await axios.request(options);
                    setData(response.data); // Don't forget to set the data
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        if (locationLatitude.lat && locationLatitude.lng) {
            fetchData();
        }
    }, [locationLatitude]); // This effect runs when `locationLatitude` changes

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