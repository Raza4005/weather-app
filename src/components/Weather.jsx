import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import desc from '../assets/desc.jpg'


const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d" : clear,
        "01n" : clear,
        "02d" : cloud,
        "02n" : cloud,
        "03d" : cloud,
        "03n" : cloud,
        "04d" : drizzle,
        "04n" : drizzle,
        "09d" : rain,
        "09n" : rain,
        "010d" : rain,
        "010n" : rain,
        "013d" : snow,
        "013n" : snow,

    }
    const search = async (city) =>{
        if (city ===""){
            alert("Enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);

            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                temperature: data.main.temp,
                windSpeed: Math.floor (data.wind.speed),
                location: data.name,
                description: data.weather[0].description,
                icon: icon
            })
        } 
        catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data")
        }
    }

    useEffect(() => {
        search("london");
    },[])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='Search' />
            <img src={search_icon} onClick={() => search(inputRef.current.value)} />
        </div>
        {weatherData?<>
                    <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='tem'>{weatherData.temperature}°c</p>
            <p className='loc'>{weatherData.location}</p>
            <div className='weather-data'>
                <div className='col'>
                    <img src={humidity} />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind} alt="" />
                    <div>
                        <p>{weatherData.windSpeed}km/h</p>
                        <p>Wind speed</p>
                    </div>
                </div>
                <div className='col'>
                    <img src={desc} alt="" />
                    <div>
                        <p>{weatherData.description}</p>
                        <p>Description</p>
                    </div>
                </div>
            </div>
            </>:<></>}
    </div>
  )
}

export default Weather

            // <img src={cloud} alt="" />
            // <img src={drizzle} alt="" />
            // <img src={humidity} alt="" />
            // <img src={rain} alt="" />
            // <img src={snow} alt="" />
            // <img src={wind} alt="" />