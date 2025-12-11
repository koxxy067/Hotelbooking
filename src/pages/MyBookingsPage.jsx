import React, { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

function MyBookingsPage() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (user) {
            api.get(`/bookings?userId=${user.id}`).then((res) => setBookings(res.data));
            api.get("/rooms").then((res) => setRooms(res.data));
        }
    }, [user]);

    if (!user) {
        return (
            <div className="page">
                <h2>My Bookings</h2>
                <p>Please login to view your bookings.</p>
            </div>
        );
    }

    const getRoom = (roomId) => rooms.find((r) => r.id === roomId);

    return (
        <div className="page">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>You have no bookings yet.</p>
            ) : (
                <div className="booking-list">
                    {bookings.map((b) => {
                        const room = getRoom(b.roomId);
                        return (
                            <div className="booking-card" key={b.id}>
                                <h3>{room ? room.name : "Room"}</h3>
                                <p>
                                    Check-in: {b.checkIn} | Check-out: {b.checkOut}
                                </p>
                                <p>Guests: {b.guests}</p>
                                <p>Total Price: ₹ {b.totalPrice}</p>
                                <p>Status: {b.status}</p>
                                {room && (
                                    <Link to={`/rooms/${room.id}`} className="btn btn-small">
                                        View Room
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default MyBookingsPage;
