import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Geo_Api_url, geoApioptions } from '../api/Api';

export default function Search({ onSearchChange }) {
    const [search, setSearch] = useState(null);
    const [options, setOptions] = useState([]);
    let debounceTimeout;



    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${Geo_Api_url}/cities?namePrefix=${inputValue}`, geoApioptions);
            const localData = await response.json();

            // Filter localData based on search input
            const filteredData = localData.data.filter((city) =>
                city.name
            );

            // console.log("filterd->", filteredData);

            // Map the filtered data to options
            const formattedOptions = filteredData.map((city) => ({
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name} ${city.countryCode}`,
            }));

            // Set the options state
            setOptions(formattedOptions);
        } catch (error) {
            console.log(error);
        }
    };



    const handleInputChange = (inputValue) => {
        clearTimeout(debounceTimeout);

        // Debounce the loadOptions function
        debounceTimeout = setTimeout(() => {
            loadOptions(inputValue);
        }, 600); // Adjust the debounce delay as needed
    };


    useEffect(() => {
        return () => {
            // Cleanup function to clear the timeout when the component unmounts
            clearTimeout(debounceTimeout);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, onSearchChange]); // Include dependencies in the dependency array


    const handlechange = (selectedOption) => {

        setSearch(selectedOption);
        onSearchChange(selectedOption);
    };

    return (
        <Select
            placeholder="Search a City"
            value={search}
            onChange={handlechange}
            onInputChange={handleInputChange}
            options={options}
        />
    );

}
