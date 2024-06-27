import { useState, useEffect } from "react";

import weatherService from "../services/weather"

const Weather = (props) => {
    const [weatherInfo, setWeatherInfo] = useState({})

    const { capital } = props;


    useEffect(() => {
        weatherService.getCurrentWeather(capital)
        .then(data => setWeatherInfo(data))
        .catch(err => console.log(err));
    }, [capital])

    const kelvinToCelsis = (kelvin) => {
        return kelvin - 273.15;
    }

    return (
        Object.keys(weatherInfo).length !== 0 && (
            <div>
                <h2>Weather in {capital}</h2>
                <p>temperature {kelvinToCelsis(weatherInfo['main']['temp'])} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weatherInfo['weather'][0]['icon']}@2x.png`} alt={weatherInfo['weather'][0]['description']}/>
                <p>wind {weatherInfo['wind']['speed']}m/s</p>
            </div>
        )
    )
}

export default Weather;