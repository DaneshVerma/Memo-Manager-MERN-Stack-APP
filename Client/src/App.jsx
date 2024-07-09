import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AboutNote from "./components/about.jsx";
import Note from "./components/Note.jsx";
import CreateArea from "./components/CreateArea.jsx"; // above rest are react components
import axios from "axios"; // for conneting with the server to communicate
import { v4 as uuidv4 } from "uuid"; // for assining each note element a unique id
import './App.css'

const backendURL = "https://memo-manbger-backend-production.up.railway.app"
console.log(backendURL);
function App() {
  const [notes, setNotes] = useState([]); // to store notes data retrived from server
  const [noteToEdit, setNotetoEdit] = useState(null); // used to store a specific note for performing updatation or editing on that.

  useEffect(() => {
    // fetches the existing saved note data from MongoDB server
    axios.get(`${backendURL}/data`).then((response) => {
      setNotes(response.data);
    });
  }, []);

  function addNote(newNote) {
    // this function sends the new note entry to server and fecthes the the data containing new entry
    axios
      .post(`${backendURL}/new`, {
        title: newNote.title,
        note: newNote.content,
        noteid: uuidv4(),
      })
      .then((response) => {
        setNotes((prevValue) => {
          return [...prevValue, response.data];
        });
      });
  }

  function deleteNote(noteid) {
    // this function sends delete request for seleted note by its id facthes the new data after deletation
    axios
      .delete(`${backendURL}/delete`, { data: { id: noteid } })
      .then((response) => {
        setNotes(response.data);
      });
  }
  function editNote(params) {
    // selecting a specific note object to edit
    setNotetoEdit(params);
  }
  function updateNote(note) {
    // after editing this function send's an update request to the server with the data to be updated and fecthes new data with updated changes.
    console.log(note);
    axios.put(`${backendURL}/update`, note).then((response) => {
      setNotes(response.data);
    });
  }

  // this is just a constent variable containing information about me a fellow developer not included it into the other notes in the database so that only this note object can be the immutable one.
  const myAbout = {
    index: "me",
    title: "About",
    note: "I'm Danesh one who made this MERN stack based project. the application's Concept is inspired from Google Keep. click at the header of this site to see the source code & click On my name below to contact me.",
  };
  return (
    // rendering all the required components along with sending required props to each.
    <div >
      <Header />
      <CreateArea onAdd={addNote} editable={noteToEdit} onUpdate={updateNote} />
      <div className="container">
        <AboutNote title={myAbout.title} content={myAbout.note} />
        {Array.isArray(notes)
          ? notes.map((noteItem, index) => {
              return (
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.note}
                  noteId={noteItem.id}
                  onDelete={deleteNote}
                  onEdit={editNote}
                />
              );
            })
          : null}
      </div>
      <Footer />
    </div>
  );
}

export default App;
