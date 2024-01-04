import React from 'react'
import '../forcastWeather/forcastCss.css';

import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion'

function Forcast_Weather({ data }) {


    const days_array = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const get_day = new Date().getDay();

    const result_array = days_array.slice(get_day).concat(days_array.slice(0, get_day));



    return (
        <div className='weather'>

            <label>Forcast  Data </label>

            <Accordion allowZeroExpanded>

                {data.list.splice(0, 7).map((item, index) =>
                (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className='daily-item'>
                                    <img
                                        alt="weather"
                                        className="weather-icon"
                                        src={`icons/${item.weather[0].icon}.png`}
                                    />
                                    <label className='day'> {result_array[index]} </label>
                                    <label className='description'>{item.weather[0].description} </label>

                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>

                        <AccordionItemPanel>
                            <div className='daily-details-grid'>

                                <div className='daily-details-grid-item'>
                                    <label>Pressure</label>
                                    <label>{item.main.pressure}</label>
                                </div>

                                <div className='daily-details-grid-item'>
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>

                                <div className='daily-details-grid-item'>
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}</label>
                                </div>

                                <div className='daily-details-grid-item'>
                                    <label>wind</label>
                                    <label>{item.wind.speed}m/s</label>
                                </div>

                                <div className='daily-details-grid-item'>
                                    <label>sea level</label>
                                    <label>{item.main.sea_level}m </label>
                                </div>

                            </div>

                        </AccordionItemPanel>


                    </AccordionItem>
                ))}

            </Accordion>

        </div>
    )
}

export default Forcast_Weather