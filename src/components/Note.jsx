import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import axios from "axios";
import {BiEdit} from "react-icons/bi";


function Note({ user, favoriteId, shouldFetch, setShouldFetch }) {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNote, setEditedNote] = useState("");

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `https://hooks.adaptable.app/notes?userId=${user.id}&favoriteId=${favoriteId}`
      );
    
      setNotes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (shouldFetch) {
      fetchNotes();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

 
  //set the editingNotgeId and pre-fill the txtarea w/ the current note text.
  const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setEditingNoteId(id);
    setEditedNote(noteToEdit.note);
  };

  //-->send Patch request with the edited note
  const handleSave = async (id) => {
    try {
      await axios.patch(`https://hooks.adaptable.app/notes/${id}`, {
        note: editedNote,
      });
      setEditingNoteId(null);
      setEditedNote("");
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hooks.adaptable.app/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };



  return notes.map((note) => (
    <div className="note">
      <div>
        <div key={note.id} className="note-item">
          {editingNoteId === note.id ? (
            <div className="textarea-notes">
              <textarea
                cols="20"
                rows="8"
                placeholder="Click to start adding a note.."
                value={editedNote}
                onChange={(e) => setEditedNote(e.target.value)}
              ></textarea>
              <button className="save" onClick={() => handleSave(note.id)}>Save</button>
            </div>
          ) : (
            <p>{note.note}</p>
          )}
        </div>
      </div>
      <div className="note-footer">
        <small>{note.date}</small>
        {editingNoteId !== note.id && (
          <button className="edit-btn" onClick={() => handleEdit(note.id)}><BiEdit /></button>
        )}

        <RiDeleteBin2Line
          className="delete-icon"
          size="1.2rem"
          onClick={() => handleDelete(note.id)}
        />
      </div>
    </div>
  ));
}

export default Note;
