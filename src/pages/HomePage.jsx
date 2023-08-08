import  {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { PiHeartBold } from "react-icons/pi";


const API_URL = "https://hooks.adaptable.app/hotels";

function HomePage({user}) {
  
  
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1)
  const [userFavorites, setUserFavorites] = useState([])
  
  async function fetchAllHotels(page) {
    try {
      const response = await axios.get(`${API_URL}?_page=${page}&_limit=9`);
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
      }
      await axios.post("https://hooks.adaptable.app/favorites", newFavorite)
      console.log('POST HOTEL')
      fetchFavorites()
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchAllHotels(page);
  }, [page]);

  function handlePreviousButton() {
    setPage(page - 1)
  }

  function handleNextButton() {
    setPage(page + 1)
  }

  const fetchFavorites = async () => {
    try {
      const response = await axios.get (
        `https://hooks.adaptable.app/favorites?userId=${user.id}`
      )
      setUserFavorites(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])


  async function removeFavorites(favoriteId) {
		try {
			await axios.delete("http://localhost:3000/favorites/" + favoriteId)
			fetchFavorites()
		} catch (error) {
			console.log(error.message)
		}
	}


  if (!hotels) {
    return <div className="hotelLoading"> Loading..</div>;
  }

  return (
    <>
      <div className="homePage">
        {hotels.map((hotel) => {
          	const isFav = userFavorites.find((fav) => fav.id === hotel.id)
          return (
            <div key={hotel.title} className="hotelContainer">
              <img className="hotelImage" src={hotel.imgUrl} />
              <Link to={`/hotel/${hotel.title}`}>
                <h2 className="hotel-name">{hotel.title}</h2>{" "}
              </Link>
            <p className="hotel-address">{hotel.address}</p>
            <p className="hotel-rating">Rating: {hotel.rating}</p>
            {isFav ? (
							<button onClick={() => removeFavorites(isFav.id)}>❤️</button>
						) : (
							<button onClick={() => addToFavorites(hotel.id)}>💔</button>
						)}
            </div>
          );
        })}
      </div>
      <div className="ButtonContainerHomePage">
        <button onClick={handlePreviousButton}>Previous</button>
        <button onClick={handleNextButton}>Next</button>
      </div>
    </>
  );
}

export default HomePage;
