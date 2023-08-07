import React from "react";
import "./App.css"
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
import './App.css';
import Layout from "./components/Layout";

function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="hotel/:title" element={<HotelDetails />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
