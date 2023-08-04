import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://hooks.adaptable.app/hotels";
function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1)
//   let page = 2;

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
    page - 1;
    console.log(page);
    return fetchAllHotels(page);
  }

  function handleNextButton() {
    page + 1;
    console.log(page);
    return fetchAllHotels(page);
  }

  if (!hotels) {
    return <div className="hotelLoading"> Loading..</div>;
  }

  return (
    <div>
      {hotels.map((hotel) => {
        return (
          <div key={hotel.title}>
            {" "}
            <p> Hotel: {hotel.title}</p>{" "}
          </div>
        );
      })}

      <h1 style={{ color: "blue", fontSize: "16px" }}> HOOKS </h1>
      <button onClick={() => setPage(page + 1)}>Previous</button>
      <button onClick={handleNextButton}>Next</button>
    </div>
  );
}

export default HomePage;
