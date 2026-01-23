import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();
const MICROSERVICE_API_KEY = process.env.MICROSERVICE_API_KEY;

const router = Router();


const eventData = [
    { id: 1, location: "New Orleans", name: "Birthday Party", date: "2026-01-30" },
    { id: 2, location: "Memphis", name: "Wedding", date: "2026-01-25" },
    { id: 3, location: "Memphis", name: "Groundhog Day Party", date: "2026-02-07" },
]

// events
router.get("/", (req, res) => {
    res.json(eventData);
});

// example /events/2

router.get("/:id", async (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    console.log(eventId)


    // TODO: switch to Supabase
    let temp = null;
    for (let i = 0; i < eventData.length; i++) {
        console.log(eventData[i]);
        if (eventId === eventData[i].id) {
            temp = eventData[i];
        }
    }
    const event = temp; // TODO: const event = supabase

    const date = event.date;
    const location = event.location;

    // Access microservice
    const weatherUrl = `http://localhost:3001/weather-for-date/${date}/${location}`;
    console.log(weatherUrl);
    const response = await fetch(weatherUrl, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": MICROSERVICE_API_KEY
        }
    });
    const weatherData = await response.json();
    
    event.weather = weatherData;

    res.json(event);
});


export default router;
