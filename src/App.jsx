import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelDetails from "./pages/HotelDetails";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import UserAuthentification from "./components/UserAuthentification";
import Comments from "./components/Comments";
import Footer from "./components/Footer";
import Map from "./components/Map";
import PersonalNotes from "./components/PersonalNotes";

function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel/:title" element={<HotelDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
