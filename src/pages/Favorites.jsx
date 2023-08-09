import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Note from "../components/Note";

function Favorites({ user }) {
  const [userFavorites, setUserFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      // Added _expand=hotel to get hotel infos
      const response = await axios.get(
        `https://hooks.adaptable.app/favorites?userId=${user.id}&_expand=hotel`
      );
      setUserFavorites(response.data);
      console.log(response.data, "lala");
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchFavorites();
  }, []);

 
  if (!user) {
    return <Navigate to="/login" />;
  }

  // console.log(favoriteHotelsDetails);
  return (
    <>
      <div className="hotelfave-cards">

        {userFavorites.map(({hotel}) => {
          if (hotel) {
            return (
              <div key={hotel.id}>
                <div >
                  <img
                    className="fav-hotelsdetails"
                    src={hotel.imgUrl}
                    alt=""
                  />
                  <h2> {hotel.title} </h2>
                  <p>{hotel.address}</p>
                  <Note />
                </div>
              </div>
            );
          }
          return "Sorry, unknown hotel";
        })}
      </div>
    </>
  );
}

export default Favorites;
