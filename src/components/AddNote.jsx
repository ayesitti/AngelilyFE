import React, { useState } from "react";

const notesURL = "https://hooks.adaptable.app/notes";
function AddNote({handleAddNote}) {
  const [noteText, setNoteText] = useState("");

  const handleChange = (event) => {
    setNoteText(event.target.value)
  }
  const handleSaveClick = async (event) => {
    event.preventDefault();
    handleAddNote()

    try {
      const noteToAdd = {
        hotelId: Number(hotelId),
        favoriteId: Number(favoriteId),
        note: noteText,
      };
      const response = await axios.post(`${notesURL}`, noteToAdd);
      console.log(response);
      fetchNotes();
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
            onChange={(e) => setNoteText(e.target.value)}
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
