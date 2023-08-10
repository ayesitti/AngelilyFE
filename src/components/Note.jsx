import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import axios from "axios";

function Note({ user, favoriteId }) {
    const [note, setNote] = useState([])
    console.log(favoriteId);

    const fetchNotes = async () => {
		try {
			const response = await axios.get(
			  `https://hooks.adaptable.app/notes?userId=${user.id}&favoriteId=${favoriteId}`
			);
			setNote(response.data);
            console.log(response.data);
			
		  } catch (error) {
			console.log(error);
		  }
	}
    useEffect(() => {
		fetchNotes();
	}, [user.id, favoriteId]);

    //const handleNoteDelete 

    if (!note) {
        return "Create a note..";
      }
  /**
   * We need a state to store the note from the API
   * We need a useEffect to fetch a note with the userId and the favoriteId
   */

//   function changeColor(e) {
//     e.target.style.backgroundColor = "yellow";
//   } add in div classname:contentEditable={true} onBlur={changeColor}
const handleChange = (e) => {
    console.log(e.target.value);
}


  return (
    <div className="note" > 
      {/* <span >
        Notes will appear here :) {" "}

      </span> */}
      <div>
        {note.map((note) => (
            <div key={note.id} className="note-item"> 
            <p>{note.text}</p>
            <small>{note.date}</small>
            </div>
        ))}
      </div>
      <div className="note-footer">
        <small>29/10/2023</small>
         
        <RiDeleteBin2Line className="delete-icon" size="1.2rem" />
        
        
      </div>
    </div>
  );
}

export default Note;
