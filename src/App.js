import React, { useEffect, useState } from "react";
import '../src/App.css';
import Search from "./components/searchbar/Search";

import CurrentWeather from "./components/current-weather/CurrentWeather";
import { currweatherURL, C_W_API_key, forcastURL } from "./components/api/Api";
import ForcastWeather from "./components/forcastWeather/ForcastWeather";
import Navbar from "./components/Navbar";

function App() {


  const [backgroundImage, setBackgroundImage] = useState(null);

  // Fetch a random weather-related image from the internet
  useEffect(() => {

    const fetchImage = async () => {

      try {
        const response = await fetch('https://source.unsplash.com/1920x1080/?weather');
        const imageURL = response.url;

        setBackgroundImage(`url(${imageURL})`);
      }
      catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchImage();
  }, []);

  const [currWeather, setCurrWeather] = useState(null);
  const [forcastWeather, setforcastWeather] = useState(null);

  const handleOnChange = async (searchdata) => {
    try {

      const [lat, lon] = searchdata.value.split(' ').map(parseFloat);

      const currweatherResponse = await fetch(`${currweatherURL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${C_W_API_key}`);
      const forcastResponse = await fetch(`${forcastURL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${C_W_API_key}`);

      const currWeatherData = await currweatherResponse.json();
      const forcastWeatherData = await forcastResponse.json();

      // console.log("dat cur->", currWeatherData)
      // console.log("data for->", forcastWeatherData)

      setCurrWeather({ city: searchdata.label, ...currWeatherData });
      setforcastWeather({ city: searchdata.label, ...forcastWeatherData });

    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      // Handle the error appropriately, e.g., display an error message to the user.
    }
  };


  const geoapiweatherfun = async (userLocation) => {
    try {
      let lat=userLocation.latitude;
      let lon=userLocation.longitude;

      console.log("lat ->",lat,"lon->",lon);

      const currweatherResponse = await fetch(`${currweatherURL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${C_W_API_key}`);
      const forcastResponse = await fetch(`${forcastURL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${C_W_API_key}`);

      const currWeatherData = await currweatherResponse.json();
      const forcastWeatherData = await forcastResponse.json();

      // console.log("dat cur->", currWeatherData)
      // console.log("data for->", forcastWeatherData)

      setCurrWeather({  ...currWeatherData });
      setforcastWeather({  ...forcastWeatherData });

    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      // Handle the error appropriately, e.g., display an error message to the user.
    }
  }

  console.log(currWeather);
  // console.log(forcastWeather);

  return (

    <div className="container" style={{ backgroundImage }}>

      <Navbar onhandlelatlon={geoapiweatherfun} />

      <Search onSearchChange={handleOnChange} />
      {
        currWeather &&
        <CurrentWeather data={currWeather} />
      }

      {forcastWeather && <ForcastWeather data={forcastWeather} />}
    </div >
  );
}

export default App;
