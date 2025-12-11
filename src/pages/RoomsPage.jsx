import React, { useEffect, useState } from "react";
import api from "../api";
import RoomCard from "../components/RoomCard.jsx";

function RoomsPage() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        api.get("/rooms").then((res) => setRooms(res.data));
    }, []);

    return (
        <div className="page">
            <h2>All Rooms</h2>
            <div className="room-grid">
                {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>
        </div>
    );
}

export default RoomsPage;
