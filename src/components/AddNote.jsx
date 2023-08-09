import React, { useState } from "react";

function AddNote({handleAddNote}) {
    const [noteText, setNoteText] = useState('')

const handleChange = (event) => {
setNoteText(event.target.value);
}
const handleSaveClick = () => {
    handleAddNote()
}


  return (
    <div className="note-new">
      <textarea
        cols="10"
        rows="8"
        placeholder="Type to add a note.."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>200 remaining</small>
        <button className="save" onClick={handleSaveClick}> Save </button>
      </div>
    </div>
  );
}

export default AddNote;
