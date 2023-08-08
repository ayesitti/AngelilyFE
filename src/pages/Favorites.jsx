import React, { useEffect, useState } from 'react'
import { PiHeartBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
function Favorites() {
  const [hotels, setHotels] = useState(null)
  const [userFavorites, setUserFavorites] = useState(null)

  const fetchHotels = async () => 
  setHotels((await axios.get("https://hooks.adaptable.app/hotels")).data)
  const fetchFavorites = async () => {
    try {
      const response = await axios.get (
        `https://hooks.adaptable.app/favorites?userId=${users.id}`
      )
      console.log(response.data) ;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchHotels()
    fetchFavorites()
  }, [])

  async function addToFavorites(hotelId) {
    try {
      const newFavorite = {
        userId: user.id,
        hotelId: hotelId,
      }
      await axios.post("https://hooks.adaptable.app/favorites", newFavorite)
      fetchFavorites()
    } catch (error) {
      console.log(error.message);
    }
  }
  if (!hotels || !userFavorites) {
    return <p>Sorry, there's no hotel to display</p>
  }

  return (
    <div>
      <h2>Favorite thingzzzz</h2>
    {hotels.map((hotel) => {
      const isFave = userFavorites.find((el) => el.hotelId === hotel.id) 
      return (
        <p key={hotel.id}>
          {hotel.title} 
          {isFave ? (
            <button onClick={() => removeFavorites(isFave.id)}><FaRegHeart /></button>
          ): ( 
            <button onClick={() => addToFavorites(hotel.id)}><PiHeartBold/><PiHeartBold/></button>
          )}
        </p>
      )
    })}

    </div>
  )
}

export default Favorites