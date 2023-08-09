import '../stylesDetailPage.css'
import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Map from '../components/Map'
import useForm from "../useForm"
import { Rating } from 'react-simple-star-rating'

const baseURL =  "https://hooks.adaptable.app/hotels";

function HotelDetails() {
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
	}, []);
	
	/// comments
	const [formData, handleChange] = useForm({
		score: 0,
		comment: ""
	})
	const [rating, setRating] = useState(0)


	function handleSubmit(event) {
		event.preventDefault()
		// send the ratings as well
	}
	///stars
	const handleRating = (rate) => {
		setRating(rate)
		console.log(rate)
	  }
	


	if (!hotel.length) {
	return <div>Loading...</div>;
	}
  
	return (
	<div>
		
		<h1 className='oneHotelTitle'> {oneHotel.title} </h1>
		<p className='oneHotelAdress'>{ oneHotel.address}</p>
		<div className='photosZone'>
		<img src={oneHotel.imgUrl} alt="" className='mainPhotoOfHotel' />
		{console.log(oneHotel, "check")}
			
		
			{ oneHotel.imgRooms.map(el => {
			return (
				<div key={el} >	
			<img src={el} alt="" className='photosOfOneHotel' />
				</div>
			)})}
			</div>

		<form onSubmit={handleSubmit}>
		<div>
			<h1> You can share with us your opinion</h1>
				<label htmlFor='starRating'>Rating:</label>
			 <Rating
        onClick={handleRating}
      
        /* Available Props */
      />
				<label htmlFor="name">Name: </label>
				<textarea id="name" value={formData.comment} 
				name="" cols="30" rows="10" onChange={handleChange}></textarea>
				
		</div>
		</form>


		<Map oneHotel={oneHotel}/>
	</div>
	);
}


  export default HotelDetails;