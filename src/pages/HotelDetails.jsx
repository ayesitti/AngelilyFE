import '../stylesDetailPage.css'
import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Map from '../components/Map'
import useForm from "../useForm"
import { Rating } from 'react-simple-star-rating'
import {FaUser, FaStar} from "react-icons/fa"
import {FaShare} from "react-icons/fa"
const baseURL =  "https://hooks.adaptable.app/hotels";
const raitingURL = "https://hooks.adaptable.app/ratings"
import { PiHeartBold, PiHeartFill } from "react-icons/pi";


function HotelDetails({user}) {
	
	const {id} = useParams();
	const [oneHotel, setOneHotel] = useState(null);
	//const [isFav, setIsFav] = useState(null);
	let isFav;
  
	// feyching our one hotel
	const fetchHotel = async () => {
		try {
			console.log(`${baseURL}/${id}`)
			return await axios.get(
			  `${baseURL}/${id}` //2
			).then(res => {
				console.log(res, 'restest')
			setOneHotel(res.data);
			});
		  } catch (error) {
			console.error(error);
		  }
	}
	useEffect(() => {
		fetchHotel()
		fetchComments()
		fetchFavorites()
	}, []);



	// comments
const [comments, setComments] = useState([]);

	const fetchComments = async () => {
		try {
			const response = await axios.get(
			  `https://hooks.adaptable.app/ratings`
			).then(response => {
				setComments(response.data);
			})
			
			
		  } catch (error) {
			console.log(error);
		  }
	}

	const [formData, handleChange] = useForm({
		score: 0,
		comment: "",
		userId: user.id
	})
	const [rating, setRating] = useState(0)


	function handleSubmit(event) {
		event.preventDefault()
		formData.score = rating;
		axios.post(raitingURL, formData).then(() => {
		//fetch
		fetchComments()
		formData.comment =""
		console.log('rating was poated')
		})
	}
	///stars
	const handleRating = (rate) => {
		setRating(rate)
	  }
	

	
	// favorites
	
	const [userFavorites, setUserFavorites] = useState([]);

	const fetchFavorites = async () => {
		try {
			console.log(`https://hooks.adaptable.app/favorites?userId=${user.id}`)
			return await axios.get(
			`https://hooks.adaptable.app/favorites?userId=${user.id}`
			).then(response => {
				setUserFavorites(response.data);
				console.log(isFav, 'isFav')

			console.log(response, 'reesponstetest')
			})
			
		} catch (error) {
			console.log(error);
		}
	};
	
	console.log(userFavorites, 'список фаворит')
	  
	  async function addToFavorites(hotelId) {
		  try {
			  const newFavorite = {
				  userId: user.id,
				  hotelId: hotelId,
		  };
		  await axios.post("https://hooks.adaptable.app/favorites", newFavorite);
		  console.log("POST HOTEL");
		  fetchFavorites();
		} catch (error) {
		  console.log(error.message);
		}
	  }
	  
	  
	  
	  async function removeFavorites(favoriteId) {
		try {
			await axios.delete("https://hooks.adaptable.app/favorites/" + favoriteId);
		  fetchFavorites();
		} catch (error) {
		  console.log(error.message);
		}
	}

	async function check () {
	isFav = userFavorites.find((fav) => fav.hotelId === oneHotel.id)
	// return isFav
 }
check()
console.log(oneHotel)


	if (!oneHotel|| !comments) {
		return <div>Loading...</div>;
	}
	return (  
<div className="grid-container">
		<div className="grid-item one">
			<div className='head'>
		<h1 className='oneHotelTitle'> {oneHotel.title} </h1>
		<p className='oneHotelAdress'>{ oneHotel.address}</p>

			</div>

		</div>



		<div className="grid-item two barWithIconsDetailsPage">
		<div className="heartDetailsPage ">
		{(isFav) ? (
                <button onClick={() => removeFavorites(isFav.id)}>
					
					<PiHeartFill className="heartDetailsPage"/></button>
              ) : (
                <button onClick={() => {
                  if (user) {
                  addToFavorites(oneHotel.id)
                } else {
                  navigate("/login")
                }
                }}><PiHeartBold  className="heartDetailsPage2 "/></button>
              )}
		</div>
		
			  <div className=" smallbox">
				<div>
			  <FaStar className='iconDetailPage' />
			
				</div>
				<div className='textRat'>	<p>Raiting: {oneHotel.rating}</p></div>

			  <FaShare className='iconDetailPage'/>
			  <p>Share</p>
			  </div>
			 
	
			  </div>


		<div className="grid-item three photosZone">
			<div className='photosZone'>

		<div className='grid-item-full'> <img src={oneHotel.imgUrl} alt="" className='mainPhotoOfHotel ' />
			</div>

			<div className='grid-item-split'>
		{ oneHotel.imgRooms.map(el => {
			return (
				<div key={el} className='grid-item2'>	
			
			<img src={el} alt="" className='photosOfOneHotel' />
			
				</div>
			)})}
		</div>
			

			</div>


		</div>


		<div className="grid-item four">

				<div className='containerBar'>

		<div className='infoIneHotel'>
				<p>{oneHotel.info}</p>
				</div>

				<div className='price'>
				<p> price</p>
				</div>

				</div>


		</div>


		<div className="grid-item five">
			
<div className='smallicons grid-item'>
	<img src="../../public/ekv.jpg" alt="" />
</div>
<Map className='grid-item'oneHotel={oneHotel}/>

		</div>


		<div className="grid-item six">
		<form onSubmit={handleSubmit} className='formComments  grid-item'>
		<div className='comments'>
			<h1> You can share with us your opinion</h1>
				<label htmlFor='starRating'>Rating:</label>
			 <Rating
        onClick={handleRating}
      
     
      />
				<label htmlFor="opinion"> Your opinion: </label>
				<textarea id="comment" value={formData.comment} 
				name="opinion" cols="30" rows="10" onChange={handleChange}></textarea>
				
		<div>
		<button className='buttonComents button'>Send</button>
		</div>
		</div>
		</form>
		
				
		<div>
	{comments.map(el => {
	
			return (
				<div key={el.id} className='allOpinions grid-item'>	
			<FaUser className='userIcon'/>
			<div> 
			
			<p className='score'> ⭐ {el.score}  </p>
			</div>
			<p> {el.comment}</p>
				</div>
			)})}
			</div>

		
</div>
</div>
	);
}




  export default HotelDetails;