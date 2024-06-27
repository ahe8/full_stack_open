import axios from 'axios'

const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getCurrentWeather = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`

    const request = axios.get(url)
    return request.then(response => response.data);
}


export default { getCurrentWeather }