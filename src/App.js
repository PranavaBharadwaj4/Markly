import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
// import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";
import Footer from "./components/Footer";
import Scrollbar from "./components/Scrollbar";

export default function App() {
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );

  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  const [numNotes, setNumNotes] = React.useState(1);

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    setNumNotes((numNotes) => numNotes + 1);
    const newNote = {
      id: nanoid(),
      count: numNotes,
      name: "",
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // Put the most recently-modified note at the top
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }
  // updating names
  function updateNoteName(event) {
    // Put the most recently-modified note at the top
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.push({ ...oldNote, name: event.target.value });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  function deleteNote(event, noteId) {
    setNumNotes((numNotes) => (numNotes - 1 > 0 ? numNotes - 1 : 1));
    event.stopPropagation();

    console.log("deleting note");
    // Your code here
    setNotes((notes) => {
      return notes.filter((note) => noteId !== note.id);
    });
    // setCurrentNoteId(notes[0].id)
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  // function toggleShow() {
  //   setShow((show) => !show);
  // }

  return (
    <main>
      {/* <Scrollbar /> */}
      {notes.length > 0 ? (
        <Split sizes={[24, 76]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            numNotes={notes.length}
            // toggleShow={toggleShow}
            delete={deleteNote}
            // show={show}

            updateNoteName={updateNoteName}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You Have No Notes...</h1>
          <button className="first-note" onClick={createNewNote}>
            CREATE
          </button>
        </div>
      )}
      <Footer />
    </main>
  );
}
