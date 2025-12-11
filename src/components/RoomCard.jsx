import React from "react";
import { Link } from "react-router-dom";

function RoomCard({ room }) {
    return (
        <div className="room-card">
            <img src={room.image} alt={room.name} className="room-image" />
            <div className="room-info">
                <h3>{room.name}</h3>
                <p>{room.type}</p>
                <p>Capacity: {room.capacity} guests</p>
                <p className="room-price">₹ {room.price} / night</p>
                <Link to={`/rooms/${room.id}`} className="btn">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default RoomCard;
