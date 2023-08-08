import React, { useEffect, useState } from 'react'

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
        userId: useDeferredValue.id,
        hotelId: hotelId,
      }
      await axios.post("https://hooks.adaptable.app/favorites", newFavorite)

    } catch
  }
  

  return (
    <div>Favorites</div>
  )
}

export default Favorites