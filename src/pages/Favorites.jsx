import { useState, useEffect } from "react";
import axios from "axios";

// const API_URL = "https://hooks.adaptable.app/hotels";

function Favorites({ user }) {
  const [userFavorites, setUserFavorites] = useState([]);
  const [favoriteHotelsDetails, setFavoriteHotelsDetails] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `https://hooks.adaptable.app/favorites?userId=${user.id}`
      );
      setUserFavorites(response.data);
      console.log(response.data, "lala");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHotelDetails = async (hotelId) => {
    try {
      const response = await axios.get(`https://hooks.adaptable.app/hotels/${hotelId}`)
     return response.data
    } catch (error) {
      console.log(error);
      return "Oopss.. Failed to fetch hotel details"
    } 
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchDetailsFavorites = async () => {
      const allDetails = userFavorites.map((favorite) => 
    fetchHotelDetails(favorite.hotelId)
  ) 
   const details = await Promise.all(allDetails)
  setFavoriteHotelsDetails(details)
    }
    if (userFavorites.length > 0) {
      fetchDetailsFavorites()
    }
  }, [])



  return (
    <div>
      <h1> Hotel favorites</h1>
      {userFavorites.map((el) => {
        console.log(userFavorites, el);
        return (
          <div key={el.id}>
            <p> {el.id} id of favorite</p>
            <p>{el.hotelId} id of hotel</p>
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
