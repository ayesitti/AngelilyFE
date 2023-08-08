import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelDetails from "./pages/HotelDetails";
import Favorites from "./pages/Favorites";
/*import NavBar from "./components/NavBar";
import UserAuthentification from "./components/UserAuthentification";
import Comments from "./components/Comments";
import Footer from "./components/Footer";
import Map from "./components/Map";
import PersonalNotes from "./components/PersonalNotes";*/
import "./App.css";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useState, useEffect } from "react";



function App() {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  
  function storeUser(userArg) {
    setUser(userArg);
    localStorage.setItem("user", JSON.stringify(userArg));
  }


  
       

    return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage  user={user}/>} />
          <Route path="hotel/:title" element={<HotelDetails />} />
          <Route path="favorites" element={<Favorites />} />
          <Route
            path="/login"
            element={<LoginPage storeUser={storeUser}/>}
          />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
