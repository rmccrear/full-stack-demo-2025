import dotenv from "dotenv";
dotenv.config();

const MICROSERVICE_API_KEY = process.env.MICROSERVICE_API_KEY;

export async function getWeather(date, location) {
    const weatherUrl = `http://localhost:3001/weather-for-date/${date}/${location}`;
    console.log(weatherUrl);
    const response = await fetch(weatherUrl, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": MICROSERVICE_API_KEY
        }
    });
    console.log(response.ok);
    if(response.ok) {
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    } else {
        console.log(response.error);
        throw new Error("error fetching weather from microservice")
    }
}
