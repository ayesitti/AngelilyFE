import  {useState, useEffect} from "react";

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

    useEffect(() => {
     fetchFavorites()
    }, []);
  }

  return (
    <div>
      
      {userFavorites.map(el => {
        console.log(userFavorites, el, "favLily")
      return (
      <p> {el}</p>
      )
      }

      )}
   
    </div>
  )
}

export default Favorites