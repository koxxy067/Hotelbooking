import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/AuthContext.jsx";

function RoomDetailsPage() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [message, setMessage] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/rooms/${id}`).then((res) => setRoom(res.data));
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!user) {
            setMessage("Please login to make a booking.");
            return;
        }

        if (!checkIn || !checkOut) {
            setMessage("Please select check-in and check-out dates.");
            return;
        }

        const nights =
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24);

        if (nights <= 0) {
            setMessage("Check-out date must be after check-in date.");
            return;
        }

        const totalPrice = nights * room.price;

        try {
            await api.post("/bookings", {
                userId: user.id,
                roomId: room.id,
                checkIn,
                checkOut,
                guests,
                totalPrice,
                status: "confirmed"
            });

            setMessage("Booking successful!");
            setTimeout(() => navigate("/my-bookings"), 1200);
        } catch (error) {
            console.error(error);
            setMessage("Error making booking. Please try again.");
        }
    };

    if (!room) return <div className="page">Loading...</div>;

    return (
        <div className="page room-details-page">
            <div className="room-details">
                <img
                    src={room.image}
                    alt={room.name}
                    className="room-details-image"
                />
                <div className="room-details-info">
                    <h2>{room.name}</h2>
                    <p>Type: {room.type}</p>
                    <p>Capacity: {room.capacity} guests</p>
                    <p className="room-price">₹ {room.price} / night</p>
                    <p>{room.description}</p>

                    <h4>Amenities:</h4>
                    <ul>
                        {room.amenities?.map((a, index) => (
                            <li key={index}>{a}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="booking-form-container">
                <h3>Book this room</h3>
                <form onSubmit={handleBooking} className="booking-form">
                    <label>
                        Check-in:
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </label>
                    <label>
                        Check-out:
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </label>
                    <label>
                        Guests:
                        <input
                            type="number"
                            min="1"
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                        />
                    </label>
                    <button type="submit" className="btn btn-large">
                        Book Now
                    </button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default RoomDetailsPage;
