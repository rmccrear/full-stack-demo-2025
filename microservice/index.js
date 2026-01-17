import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = 3001;
const app = express();

const weather_api_key = process.env.WEATHER_API_KEY;

const weatherCache = {
    "LaLaLand": {
        days: [{ datetime: "2026-01-20", temp: 99, conditions: "Freezing" }]
    },
    "Land of Oz": {
        days: [{ datetime: "2026-01-20", temp: 99, conditions: "Raining" }]
    },
}



app.get("/weather-for-date/:date/:location", async (req, res) => {
    const date = req.params.date;
    const location = req.params.location;
    console.log(weatherCache);
    let data = null;
    if (weatherCache[location]) {
        console.log("Cache hit on ", location)
        data = weatherCache[location];
    } else if (!weatherCache[location]) {
        console.log("Cache miss on ", location)
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${weather_api_key}&contentType=json&include=days`;
        const response = await fetch(url); // expensive
        data = await response.json();
        weatherCache[location] = data;
    }

    // just get the one day...
    const weatherForDay = data.days.find((day) => day.datetime === date);

    const weatherData = {
        temp: weatherForDay.temp,
        conditions: weatherForDay.conditions,

    }

    return res.json(weatherData);
})



app.listen(PORT, () => {
    console.log("started on port " + PORT);
});