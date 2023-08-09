import React from 'react'
import {MDeleteForever} from 'react-icons/md';

function Note() {
  return (
    <div className='note'>
        <span>Hellooo Here is my firstnote!!! </span>
        <div className='note-footer'>
            <small>29/10/2023</small>
            <MDeleteForever/>
        </div>
    </div>
  )
}

export default Note