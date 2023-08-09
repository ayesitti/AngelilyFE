import { useState, useEffect } from "react";
import axios from "axios";

// const API_URL = "https://hooks.adaptable.app/hotels";

function Favorites({ user }) {
  const [userFavorites, setUserFavorites] = useState([]);
  const [favoriteHotelsDetails, setFavoriteHotelsDetails] = useState([]);
//  1. new state variable:favoriteHotelsDetails --> to hold details of the fave hotels
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
// fetchhoteldetails function fetches the details of a specific hotel using hotelId
  const fetchHotelDetails = async (hotelId) => {
    try {
      const response = await axios.get(`https://hooks.adaptable.app/hotels/${hotelId}`)
     return response.data;
     
    } catch (error) {
      console.log(error);
      return "Oopss.. Failed to fetch hotel details"
    } 
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  // below using useEffect - this is like a minifunction that runs when something specific changes... for this instance, it runs whenever userFavorites changes.
  // mapping over userfavorites - go through each item in the userFavorites, and get the hotel details.
  //  using fetchHotelDetails func to fetch details for each hotel favorite.
  //fetchHotelDetails function - like telling the API to tell me about this hotel
  // using promise.all to  fetch details for multiple fave hotels simultaneously -- since we have this bunch of tasks to fetch hotel details, this makes sure all tasks are done and all the details come in one package.
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


console.log(favoriteHotelsDetails);
  return (
    <>
    <div className="hotelfave-cards">
      {/* <h1 className="head-favorites"> Hotel favorites</h1> */}
      {/* map through the array which holds the details of the fave hotels */}
      {favoriteHotelsDetails.map((hotel) => {
        if (hotel) {
        return (
          <div>
          <div key={hotel.id}>
            <img className="fav-hotelsdetails" src={hotel.imgUrl} alt="" />
            <h2> {hotel.title} </h2>
            <p>{hotel.address}</p>
          </div>
          </div>
          );
        }
        return 'Sorry, unknown hotel'
      })}
    </div>
    </>
  );
}

export default Favorites;
