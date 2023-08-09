import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Note from "../components/Note";
import AddNote from "../components/AddNote";
import { Link } from "react-router-dom";


const notesURL = "https://hooks.adaptable.app/notes"
function Favorites({user}) {
  const [userFavorites, setUserFavorites] = useState([]);
  // const [notes, setNotes] = useState([]);

  // const fetchNotes = async () => {
  //   try {
  //     // Added _expand=hotel to get hotel infos
  //     const response = await axios.get(notesURL);
  //     setNotes(response.data);
  //     console.log(response.data, "my notesssss");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleAddNote = async () => {

  }

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
    // fetchNotes();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // console.log(favoriteHotelsDetails);
  return (
    <>
      <div className="hotelfave-cards">
        {userFavorites.map((favorite) => {
          const {hotel} = favorite 
          if (hotel) {
            return (
              <div key={hotel.id}>
                <div>
                  <img
                    className="fav-hotelsdetails"
                    src={hotel.imgUrl}
                    alt=""
                  />
                  <Link to={`/hotel/${hotel.title}`}><h2> {hotel.title} </h2></Link>
                  <p>{hotel.address}</p>
                  <Note favoriteId={favorite.id} user={user} />
                  <AddNote  />
                </div>
              </div>
            );
          }
          return "Sorry, unknown hotel";
        })}
      </div>
      {/* <div className="notes-list">
        {notes.map((note) => (
          <Note />
        ))}
      </div> */}
    </>
  );
}

export default Favorites;
