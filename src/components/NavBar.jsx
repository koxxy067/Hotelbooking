import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">
                    MyHotel
                </Link>
            </div>
            <div className="navbar-right">
                <Link to="/rooms">Rooms</Link>
                <Link to="/my-bookings">My Bookings</Link>

                {user ? (
                    <>
                        <span className="welcome-text">Hi, {user.name}</span>
                        <button className="btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-outline">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
