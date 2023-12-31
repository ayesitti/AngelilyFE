import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelDetails from "./pages/HotelDetails";

import "./App.css";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Favorites from "./pages/Favorites";
import AddNote from "./components/AddNote";

function App() {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
const navigate = useNavigate()
  
  function storeUser(userArg) {
    setUser(userArg);
    localStorage.setItem("user", JSON.stringify(userArg));
  }
  function removeUser () {
    setUser(null)
    localStorage.removeItem("user")
    navigate("/")
    
  }

  // function addNote (text)  {
  //   console.log(text);
  // }

  return (
    <div>
      <NavBar removeUser={removeUser} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage  user={user}/>} />
          <Route path="hotel/:id" element={<HotelDetails user={user}/>} />
          <Route path="favorites" element={<Favorites  user={user} />} />
            
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
