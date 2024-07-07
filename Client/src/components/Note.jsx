import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
// above imports are some material UI icon components from react

// this is the note component used to show all saved note objects
function Note(props) {
  // handing the edit and delete button clicks 
  function handleClick(action) {
    if (action === "delete") {
      props.onDelete(props.noteId); // passing note id to delelte function to delete note
    }else if (action === "edit"){
      // passing note object data to edit function to make note editable
      props.onEdit({
        title:props.title,
        content: props.content,
        id: props.noteId
      })
    }
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          handleClick("delete");
        }}
      >
        <DeleteForeverIcon />
      </button>
      <button
        onClick={() => {
          handleClick("edit");
        }}
      >
        <EditNoteIcon />
      </button>
    </div>
  );
}

export default Note;
