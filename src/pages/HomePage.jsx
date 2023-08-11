import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { PiHeartBold } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";
const API_URL = "https://hooks.adaptable.app/hotels";
import { BsSearchHeart} from "react-icons/bs";

function HomePage({ user }) {
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1);
  const [userFavorites, setUserFavorites] = useState([]);
  const navigate = useNavigate()

  async function fetchAllHotels(page, str = "") {
    try {
      const response = await axios.get(`${API_URL}?_page=${page}&_limit=12&q=${str}`);

		
      setHotels(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToFavorites(hotelId) {
    try {
      const newFavorite = {
        userId: user.id,
        hotelId: hotelId,
      };
      await axios.post("https://hooks.adaptable.app/favorites", newFavorite);

      fetchFavorites();
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchAllHotels(page);
  }, [page]);

  function handlePreviousButton() {
    setPage(page - 1);
  }

  function handleNextButton() {
    setPage(page + 1);
  }

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `https://hooks.adaptable.app/favorites?userId=${user.id}`
      );
      setUserFavorites(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function removeFavorites(favoriteId) {
    try {
      await axios.delete("https://hooks.adaptable.app/favorites/" + favoriteId);
      fetchFavorites();
    } catch (error) {
      console.log(error.message);
    }
  }
  function handleSearch(event) {
    fetchAllHotels(page, event.target.value)
	}



  if (!hotels) {
    return <div className="hotelLoading"> Loading..</div>;
  }

  return (
    <>
      <div className="homePage">
      { (
          <div className="search-bar">
             <BsSearchHeart className=" searchIcon"/>
            <input className="search-bar-text" type="search" placeholder="Hotel Name" 
            onChange={handleSearch}/>
            {/* <button className="searchBtn">
            </button> */}
           
          </div>
        )}
        {hotels.map((hotel) => {
          const isFav = userFavorites.find((fav) => fav.hotelId === hotel.id);
       
          return (
            <div key={hotel.title} className="hotelContainer">
            <div className="imgHotelContainer">  <img className="hotelImage" src={hotel.imgUrl} />
             
              {isFav ? (
                <button className="btnh" onClick={() => removeFavorites(isFav.id)}><PiHeartFill className="heart"/></button>
              ) : (
                <button className="btnh" onClick={() => {
                  if (user) {
                  addToFavorites(hotel.id)
                } else {
                  navigate("/login")
                }
                }}><PiHeartBold  className="heart2"/></button>
              )}
             
              </div> 
              <div className="hotel-text">
              <Link to={`/hotel/${hotel.id}`}>
                <h2 className="hotel-name">{hotel.title}</h2>{" "}
              </Link>
              <p className="hotel-address">{hotel.address}</p>
              <p className="hotel-rating">Rating: {hotel.rating}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ButtonContainerHomePage">
        <button className="button"onClick={handlePreviousButton}>Previous</button>
        <button className="button" onClick={handleNextButton}>Next</button>
      </div>
    </>
  );
}

export default HomePage;
