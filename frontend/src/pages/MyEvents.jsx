import { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export default function MyEvents({ navigate, user }) {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        async function getMyEvents() {
            const response = await fetch(`${baseUrl}/events`);
            const data = await response.json();
            if (response.ok) {
                setEvents(data);
            } else {
                console.log(data);
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
