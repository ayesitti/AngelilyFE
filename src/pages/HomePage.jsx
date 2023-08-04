import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
let page = 2;
const API_URL = "https://hooks.adaptable.app/hotels";

function HomePage() {
  const [hotels, setHotels] = useState([]);
  //const [page, setPage] = useState(1)

  async function fetchAllHotels(page) {
    try {
      const response = await axios.get(`${API_URL}?_page=${page}`);
      setHotels(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllHotels(page);
  }, []);

  function handlePreviousButton() {
    page = page - 1;
    console.log(page);
    return fetchAllHotels(page);
  }

  function handleNextButton() {
    page = page + 1;
    console.log(page);
    return fetchAllHotels(page);
  }

  if (!hotels) {
    return <div className="hotelLoading"> Loading..</div>;
  }

  return (
    <div>
       <h1 style={{ color: "blue", fontSize: "16px" }}> HOOKS </h1>
      <div  className="homaPage">
      {hotels.map((hotel) => {
        return (
          <div key={hotel.title} className="hotelContainer">
            {" "}
            <p> Hotel: {hotel.title}</p>{" "}
            <img className="hotelImage" src={hotel.imgUrl} />
            <button>add to favourites</button>
          </div>
        );
      })}
  </div>
      <button onClick={handlePreviousButton}>Previous</button>
      <button onClick={handleNextButton}>Next</button>
      
    </div>
  )
}

export default HomePage;
