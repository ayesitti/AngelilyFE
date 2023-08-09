import React from 'react'
import Note from './Note'
import AddNote from './AddNote'

function NoteList({notes, handleAddNote}) {
  return (
    <div></div>
    // <div className='notes-list'>
    //     {notes.map((note)=> (
    //         <Note id={note.id}
    //         text={note.text}
    //         date={note.date}
    //         />
    //     ))}
    //     <AddNote handleAddNote={handleAddNote}/>
   
  )
}

export default NoteList