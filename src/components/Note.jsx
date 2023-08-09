import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";

function Note() {
  return (
    <div className="note">
      <span>Hellooo Here is my firstnote!!! </span>
      <div className="note-footer">
        <small>29/10/2023</small>
        <RiDeleteBin2Line />
      </div>
    </div>
  );
}

export default Note;
