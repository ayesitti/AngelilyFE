import React, { useState } from "react";
import axios from "axios";

const notesURL = "https://hooks.adaptable.app/notes";
function AddNote({ handleAddNote, favoriteId, userId, hotelId, setShouldFetch }) {
  const [noteText, setNoteText] = useState("");

  const handleChange = (event) => {
    setNoteText(event.target.value);
  };
  const handleSaveClick = async (event) => {
    event.preventDefault();
    handleAddNote();

    try {
      const noteToAdd = {
        userId: Number(userId),
        hotelId: Number(hotelId),
        favoriteId: Number(favoriteId),
        note: noteText,
      };
      const response = await axios.post(`${notesURL}`, noteToAdd);
      console.log(response);
      //   fetchNotes();
      setShouldFetch(true)
      setNoteText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="note-new">
      <form onSubmit={handleSaveClick}>
        <div>
          <textarea
            cols="10"
            rows="8"
            placeholder="Type to add a note.."
            value={noteText}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="note-footer">
          <small>200 remaining</small>
          <button className="save" onClick={handleSaveClick}>
            {" "}
            Save{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNote;
