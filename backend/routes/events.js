import { Router } from "express";
import supabase from "../supabase.js";
import { getWeather } from "../utils/get-weather.js";

const router = Router();

// events
router.get("/", async (req, res) => {
    
    console.log("get events")

    const authHeader = req.headers.authorization;
    console.log(authHeader)
    // const arr = authHeader.split(" ")
    // const JWTTOken = arr[1];
    if(!authHeader) {
        res.status(401)
        return res.json({error: "No Authorization header supplied"})
    }
    const JWTToken = authHeader.split(" ")[1];
    const authResult = await supabase.auth.getUser(JWTToken);
    const userData = authResult.data;
    const userError = authResult.error;
    console.log(userData, userError)
    const user = userData.user;

    const { data, error } = await supabase
        .from("potluck_events")
        .select("id, location, event_name, date")
        .eq("user_id", user.id)
        .order("date", { ascending: true });

    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch events." });
    }

    const events = data.map((event) => ({
        id: event.id,
        location: event.location,
        name: event.event_name,
        date: event.date,
    }));

    res.json(events);
});

// example /events/2

router.get("/:id", async (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    console.log(eventId)

    // Access Subabase
    const { data, error } = await supabase
        .from("potluck_events")
        .select("id, location, event_name, date")
        .eq("id", eventId)
        .maybeSingle();

    if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch event." });
    }

    if (!data) {
        return res.status(404).json({ error: "Event not found." });
    }

    const event = {
        id: data.id,
        location: data.location,
        name: data.event_name,
        date: data.date,
    };

    const date = event.date;
    const location = event.location;

    // Access microservice
    try {
        const weatherData = await getWeather(date, location);
        event.weather = weatherData;
    } catch (error) {
        console.log(error);
        event.weather = {error: "cannot fetch weather for " + location + " " + date};
    }
    res.json(event);
});


export default router;
