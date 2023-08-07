import '../stylesDetailPage.css'
import React from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Map from '../components/Map'

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
  
	if (!hotel.length) {
	return <div>Loading...</div>;
	}
  
	return (
	<div>
		<div>
		<h1> {oneHotel.title} </h1>
		<p>{ oneHotel.address}</p>
		<div className='photosZone'>


		
		<img src={oneHotel.imgUrl} alt="" className='mainPhotoOfHotel' />
		{console.log(oneHotel, "check")}
			</div>
		<div className='roomsPhotosContainer'>
			{ oneHotel.imgRooms.map(el => {
			return (
				<div key={el} >	
			<img src={el} alt="" className='photosOfOneHotel' />
				</div>
			)})}
		</div>
			</div>
		<Map/>
	</div>
	);
  }
  
  export default HotelDetails;