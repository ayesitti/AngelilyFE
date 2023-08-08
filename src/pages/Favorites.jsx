import  {useState, useEffect} from "react";
import axios from "axios";

function Favorites({user}) {

  const [userFavorites, setUserFavorites] = useState([])

  const fetchFavorites = async () => {
    try {
      const response = await axios.get (
        `https://hooks.adaptable.app/favorites?userId=${user.id}`
      )
      setUserFavorites(response.data) 
      console.log(response.data, 'lala') ;
    } catch (error) {
      console.log(error);
    }

  }
  
  useEffect(() => {
   fetchFavorites()
  }, []);
  
  return (
    <div>
      
      <h1> Check fav</h1>
      {userFavorites.map(el => {
        console.log(userFavorites, el, "favLily")
      return (
        <>
      <p> {el.id}</p>
      <p>{el.hotelId}</p>
      </>
      )
      }

      )}
   
    </div>
  )
}

export default Favorites