import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/NavBar.jsx";

// Pages
import HomePage from "./pages/HomePage.jsx";
import RoomsPage from "./pages/RoomsPage.jsx";
import RoomDetailsPage from "./pages/RoomDetailsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MyBookingsPage from "./pages/MyBookingsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <div className="app">
      {/* Navigation Bar */}
      <NavBar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<RoomDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} My Hotel. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
