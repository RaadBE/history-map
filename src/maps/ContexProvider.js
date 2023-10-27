import React, { useEffect, useState } from 'react';
import { DataContext } from './DataContext';

const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/mapsData.json')  
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                console.log('data is hereee', data);
            })
            .catch(error => {
                console.error('Fetch error:', error);  // Log error to console
            });
    }, []);

    const handleClick = (latitude, longitude) => {
        const newData = {
            location1: latitude,
            location2: longitude,
        };
        setData(newData);
    };

    const value = {
        data,
        setData,
        handleClick,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
