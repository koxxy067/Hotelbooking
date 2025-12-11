import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import RoomCard from "../components/RoomCard.jsx";

function HomePage() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        api.get("/rooms?_limit=3").then((res) => setRooms(res.data));
    }, []);

    return (
        <div className="page">
            <section className="hero">
                <h1>Welcome to MyHotel</h1>
                <p>Book your perfect stay with comfort and luxury.</p>
                <Link to="/rooms" className="btn btn-large">
                    Browse Rooms
                </Link>
            </section>

            <section className="section">
                <h2>Featured Rooms</h2>
                <div className="room-grid">
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </section>

            <section className="section">
                <h2>Hotel Facilities</h2>
                <ul className="facilities-list">
                    <li>24/7 Front Desk</li>
                    <li>Free Wi-Fi</li>
                    <li>Swimming Pool</li>
                    <li>Gym & Spa</li>
                    <li>Restaurant & Room Service</li>
                </ul>
            </section>
        </div>
    );
}

export default HomePage;
