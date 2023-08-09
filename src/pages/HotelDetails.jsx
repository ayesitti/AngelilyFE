import '../stylesDetailPage.css'
import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Map from '../components/Map'
import useForm from "../useForm"
import { Rating } from 'react-simple-star-rating'
import {FaUser} from "react-icons/fa"
const baseURL =  "https://hooks.adaptable.app/hotels";
const raitingURL = "https://hooks.adaptable.app/ratings"

function HotelDetails({user}) {
	const [hotel, setHotel] = useState([]);
	const { title } = useParams();
	const [oneHotel, setOneHotel] = useState(null);

  
	async function fetchHotels() {
		try {
		const response = await axios.get(`${baseURL}`);
		await setHotel(response.data);
		await findHotel(response.data)
	} catch (error) {
		console.log(error);
	}}
  
	async function findHotel(hotelData) {
	const foundHotel = hotelData.find((el) => el.title === title);
	setOneHotel(foundHotel);
	}
  
	useEffect(() => {
		fetchHotels();
		fetchComments()
	}, []);

	// comments
	const [comments, setComments] = useState([]);

	const fetchComments = async () => {
		try {
			const response = await axios.get(
			  `https://hooks.adaptable.app/ratings`
			);
			setComments(response.data);
			
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

	console.log(user.id, 'check')

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
	
	  console.log(comments, "TEST");

	if (!hotel.length) {
	return <div>Loading...</div>;
	}
  
	return (
	<div>
		
		<h1 className='oneHotelTitle'> {oneHotel.title} </h1>
		<p className='oneHotelAdress'>{ oneHotel.info}</p>
		<p className='oneHotelAdress'>{ oneHotel.address}</p>
		<div className='photosZone'>
		<img src={oneHotel.imgUrl} alt="" className='mainPhotoOfHotel' />
	{ oneHotel.imgRooms.map(el => {
			return (
				<div key={el} >	
			<img src={el} alt="" className='photosOfOneHotel' />
			
				</div>
			)})}
			
			</div>

		<form onSubmit={handleSubmit} className='formComments'>
		<div className='comments'>
			<h1> You can share with us your opinion</h1>
				<label htmlFor='starRating'>Rating:</label>
			 <Rating
        onClick={handleRating}
      
        /* Available Props */
      />
				<label htmlFor="opinion"> Your opinion: </label>
				<textarea id="comment" value={formData.comment} 
				name="opinion" cols="30" rows="10" onChange={handleChange}></textarea>
				
		<div>
		<button className='buttonComents'>Send</button>
		</div>
		</div>
		</form>
		
				
		<div>
	{comments.map(el => {
		{console.log(el, "now")}
			return (
				<div key={el.id} className='allOpinions'>	
			<FaUser className='userIcon'/>
			<div> 
			
			<p className='score'> ⭐ {el.score}  </p>
			</div>
			<p> {el.comment}</p>
				</div>
			)})}
			</div>


		<Map oneHotel={oneHotel}/>


	</div>
	);
}


  export default HotelDetails;