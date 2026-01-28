import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export default function MyEvents({ navigate, user }) {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        async function getMyEvents() {
            const { data, error } = await supabase.auth.getSession();
            console.log(data, error);
            const token = data.session.access_token;
            console.log(token);
            // const url = "http://localhost:3000/events"
            // const url = "https://full-stack-demo-2025.onrender.com/events"
            const url = `${baseUrl}/events`;
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            });

            const eventData = await response.json();
            if (response.ok) {
                setEvents(eventData);
            } else {
                console.log(eventData);
            }
        }
        getMyEvents();
    }, []);

    const eventsElements = events.map((event) => (
        <div key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.location} on {event.date}</p>
        </div>
    ));

    return (
        <div>
            <h1>My Events for {user && user.email}</h1>
            <p>{user && user.id}</p>
            <div>
                {eventsElements}
            </div>
        </div>
    );
}
