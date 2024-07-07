import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
// this componet just recieves a object as a prop to render a note component containing the about info of the developer.
function AboutNote(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button style={{color: "GrayText"}}>
        <DeleteForeverIcon />
      </button>
      <button style={{color: "GrayText"}}>
        <EditNoteIcon />
      </button>
    </div>
  );
}

export default AboutNote;
