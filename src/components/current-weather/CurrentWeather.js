import React from 'react'
import '../current-weather/weathercard.css'

import CloudImage from './04n.png';

function CurrentWeather({ data }) {

    function convertTimestampToHumanReadable(input) {

        const date = new Date(1000 * input);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const amPm = hours >= 12 ? 'PM' : 'AM';

        const formatHours = hours % 12 || 12;

        const humanreadableTime = `${formatHours}:${minutes} ${amPm}`;

        return humanreadableTime;

    }


    const GMTdate = convertTimestampToHumanReadable(data.dt);
    const sunriseTime = convertTimestampToHumanReadable(data.sys.sunrise);
    const sunseTime = convertTimestampToHumanReadable(data.sys.sunset);

    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.city || data.name} ( <small className='weather-description'>{GMTdate}</small>)</p>
                    <p className="weather-description">Sunrise(&#9728;): {sunriseTime}</p>
                    <p className="weather-description">SunSet(&#9729;): {sunseTime}</p>
                </div>
                <div>
                    <img
                        alt="weather"
                        className="weather-icon"
                        src={`icons/${data.weather[0].icon}.png`}
                    />
                    <p className="weather-description">{data.weather[0].description}</p>
                </div>
                <div>
                    <img src={CloudImage} alt="Cloud Icon" />
                    <p className="weather-description">  Cloud Chances: {data.clouds.all}%</p>

                </div>
            </div>
            <div className="bottom">
                <p className="temperature">{Math.round(data.main.temp)}°C</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">feels like</span>
                        <span className="parameter-value">
                            {Math.round(data.main.feels_like)}°C
                        </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{data.wind.speed} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{data.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">{data.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default CurrentWeather