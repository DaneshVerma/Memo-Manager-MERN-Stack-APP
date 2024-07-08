import { useEffect, useRef, useState } from "react"; // react-hooks
import AddIcon from "@mui/icons-material/Add";
import Fab from '@mui/material/Fab';
import Zoom from "@mui/material/Zoom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close"; // from here other components are material UI Icon components from react.

// this component is the input & text area filed where the notes are created and updated.
function CreateArea(props) {
  // this hook used to set and track the newly being created note object
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [expandState, setexpandState] = useState(false); // this hook used to change when user click on the note creation filed.
  const [editing, setediting] = useState(false); // this hook used to defferenciate the note being written is getting edited or initialy created.

  // this tow ref hooks are used to control the typing cursur focus.
  const inputRef = useRef(null);
  const noteRef = useRef(null);

  // this useEffect hook focuses the typing cursur to title input when exapandState changes to true.
  useEffect(() => {
    if (expandState) {
      inputRef.current.focus();
    }
  }, [expandState]);

  // this useEffect triggers when a note is selected to edit that is prop.editable being not null or changed
  useEffect(() => {
    if (props.editable) {
      setNote(props.editable); // sets the note to the note that is going to be edited by this the existing data of that note automatically gets filled into input area so the user can manupulate and update that existing data
      areaClick(); // this function is called so if a user lands on the page initaily click's to any note to edit this will expand the input area without specificly clicking on it.
      setediting(true); // by changing this the input area's buttons get's replaced with button's needed to update changes or cancel.
    }
  }, [props.editable]);

  // this fuction was needed to prevent the page reload after entering title and pressing enter because its treated as submission.
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of the Enter key to transfer typing focus to textArea section
      noteRef.current.focus();
    }
  }
  // this function run on each on every charector changes into the input and textArea
  function handleChange(event) {
    const { name, value } = event.target;
    // updates every changes note hook that's how the user's entered input is tracked and stored here.
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // this function is called when user clicks on update button after editing the note.
  function updateNote() {
    props.onUpdate(note); // calling the function to update note with passing the note data to be updated.
    setediting(false); // changing input Area's button back to a single button for adding new note
    setNote({
      title: "",
      content: "",
    });
    // this setNote make's the Input Area Empty which is previously filled with the being edited note data.
    inputRef.current.focus(); // move the typing cursur focus to title input
  }

  function cancelEdit(){
    setediting(false); // changing input Area's button back to a single button for adding new note
    setNote({
      title: "",
      content: "",
    });
    // this setNote make's the Input Area Empty which is previously filled with the being edited note data.
    inputRef.current.focus(); // move the typing cursur focus to title input
  }
  // when a new note is submitted to this function triggers.
  function submitNote(event) {
    props.onAdd(note); // calling the function to add note with passing the note data to be added.
    event.preventDefault(); // prevent the page reloading after adding
    setNote({
      title: "",
      content: "",
    });
    // this setNote make's the Input Area Empty which is previously filled with the being edited note data.
  }
  // called when user initialy loads the page and clicks input Area to Create a note.
  function areaClick() {
    setexpandState(true); // changes the expand hook value to true so that user can use input filed to create a note.
  }

  return (
    <div>
      <form className="create-note w-[80%] xl:w-[480px]">
      {/* used conditional rendering here to get expansion effect in action full input filed is shown only when expnadState is true */}
        {expandState ? (
          <input
            onKeyDown={handleKeyPress}
            ref={inputRef}
            style={{ fontWeight: "bold" }}
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}

        <textarea
          name="content"
          onChange={handleChange}
          ref={noteRef}
          onClick={areaClick}
          value={note.content}
          placeholder="Take a new note..."
          rows={expandState ? "3" : "1"}   // conditional rendering to initailay show a smaller input area when expandState in false.
        />
        {/* conditiona; rendering to switch between adding note element and editing note element */}
        {expandState &&
          (editing ? (
            <div className="btns-container">
              <Zoom in={true}>
                <Fab className="btns"  color="error" onClick={cancelEdit} >
                  <CloseIcon />
                </Fab>
              </Zoom>
              <Zoom in={true}>
                <Fab className="btns" color="primary"  onClick={updateNote}>
                  <EditIcon />
                </Fab>
              </Zoom>
            </div>
          ) : (
            <Zoom in={true}>
              <Fab color="primary" onClick={submitNote}>
                <AddIcon />
              </Fab>
            </Zoom>
          ))}
      </form>
    </div>
  );
}

export default CreateArea;
